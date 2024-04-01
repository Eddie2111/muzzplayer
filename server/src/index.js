'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT;
const GetEnv = require('./env');
const mongoDB = require('./lib/mongo');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,POST",  //    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,

}
app.use(cors(corsOptions))


const formidable = require('formidable');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
app.use('/music', express.static('public/songs'));

const getS3Instance = require('./lib/aws');


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
};
const Song = require('./model/SongSchema');

// songs being posted here
app.post('/songs', async (req, res) => {
    const S3 = await getS3Instance();
    try {
        const form = new formidable.IncomingForm();
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) { reject(err); }
                else { resolve({ fields, files }); }
            });
        });

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
                const {v4} = require('uuid');
                const data = await readFile(uploadedFilePath);
                const image = await readFile(albumImageFilePath);
                const songs = await S3.upload(await SongsUpload(data)).promise();
                const album = await S3.upload(await AlbumImage(image)).promise();
                // Delete the caches for song and album image
                await unlink(uploadedFilePath);
                await unlink(albumImageFilePath);
                // creating the template and storing to db
                const song = new Song({
                    id: v4(),
                    title: fields.title[0],
                    artist: fields.artist[0],
                    genre: fields.genre[0],
                    song: songs.key,
                    albumImage: album.key,
                });
                const dataset = await song.save();
                // Send the response to the client
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

const IndexRoute = require('./routes/index');
app.use('/', IndexRoute);

const LoginRoute = require('./routes/login');
app.use('/login', LoginRoute);

const SignupRoute = require('./routes/signup');
app.use('/signup', SignupRoute);

const Songs = require('./routes/songs');
app.use('/getsongs', Songs);

const GetAllSongs = require('./routes/getallsongs');
app.use('/getallsongs', GetAllSongs);

const AddSongToFavourite = require("./routes/addSongtoFavourite");
app.use("/addtofavourites", AddSongToFavourite)

require('dotenv').config();

app.listen(port, async() => {
    await mongoDB();
    const env = await GetEnv();
    console.log(`Server running on port ${env.PORT}`);
});