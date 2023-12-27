const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');
const getS3Instance = require('../lib/aws');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const formidable = require('formidable');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const SongsUpload = async (song) => {
  return {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `songs/${Date.now().toString()}.mp3`,
    Body: song, // song data here
    ContentType: 'mpeg/mp3',
  };
};
const AlbumImage = async (image) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `images/${Date.now().toString()}.webp`,
      Body: image, // image data here
      ContentType: 'image/webp'
    };
}

const Song = require('../model/SongSchema');
router
  .route('/')
  .get(async (req, res) => {
    const S3 = await getS3Instance();
    if (req.query.id) {
    try {
      const songs = await Song.find({
        id: req.query.id
      });
      const getObjectParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: songs[0].song };
      S3.getObject(getObjectParams, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // retrieve the mp3 file from the S3 bucket
          const song = data.Body;
          // send the mp3 file as a response
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': song.length
          });
          res.write(song);
          res.end();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  })
  .post(async (req, res) => {
    const S3 = await getS3Instance();
    try {
        const form = new formidable.IncomingForm();

        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ fields, files });
                }
            });
        });

        console.log(fields, files);

        if (files && files.filetoupload && files.filetoupload.length > 0) {
            const uploadedFile = files.filetoupload[0];
            const originalFilename = uploadedFile.newFilename + path.extname(uploadedFile.originalFilename);
            const uploadedFilePath = uploadedFile.filepath;
            const newFilePath = path.join(__dirname, 'public/songs', originalFilename);

            const albumImageFile = files.albumPicture[0];
            const albumImageFilename = albumImageFile.newFilename + path.extname(albumImageFile.originalFilename);
            const albumImageFilePath = albumImageFile.filepath;
            const newAlbumImageFilePath = path.join(__dirname, 'public/images', albumImageFilename);

            try{
                // Read the file from uploadedFilePath
                const data = await readFile(uploadedFilePath);
                const image = await readFile(albumImageFilePath);
                // Write the file to newFilePath
                // await writeFile(newFilePath, data);
                const songs = await S3.upload(await SongsUpload(data)).promise();
                const album = await S3.upload(await AlbumImage(image)).promise();
                // Delete the file from uploadedFilePath
                await unlink(uploadedFilePath);
                await unlink(albumImageFilePath);
                const {v4} = require('uuid');
                // Send the response to the client
                const song = new Song({
                    id: v4(),
                    title: fields.title[0],
                    artist: fields.artist[0],
                    genre: fields.genre[0],
                    song: songs.key,
                    albumImage: album.key,
                });
                const dataset = await song.save();
                res.json({
                    message: 'File uploaded successfully.',
                    method: req.method,
                    data: dataset,
                })
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(400).json({ error: 'No file uploaded.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;



/*
! deprecated this as shifted to AWS for Storage
read the file and send the file
    try {
      // file retrieval
      const filename = req.query.filename;
      const filepath = path.join(__dirname, '../public/songs', filename);

      // Check if the file exists
      const fileExists = await new Promise((resolve) => {
        fs.access(filepath, (err) => {
          resolve(!err);
        });
      });

      if (!fileExists) {
        return res.status(404).json({ error: 'File not found.' });
      }

      // Set appropriate headers for audio file
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      // Create a readable stream from the file and pipe it to the response
      const fileStream = fs.createReadStream(filepath);
      fileStream.pipe(res);

      fileStream.on('end', () => {
        const time = new Date().toLocaleString();
        console.log(`File ${filename} sent at ${time}`);
      });

      fileStream.on('error', (err) => {
        console.error('Error streaming file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
*/
