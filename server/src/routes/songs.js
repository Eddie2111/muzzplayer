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

const Song = require('../model/SongSchema');
router
  .route('/')
  .get(async (req, res) => {
    const S3 = await getS3Instance();
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

  })
  .post(async (req, res) => {
    // under progress
  });

module.exports = router;
