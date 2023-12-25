const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const formidable = require('formidable');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const data = {
  title: "welcome",
  message: "data came from node backend",
  version: "30.11.22"
};

router
  .route('/')
  .get(async (req, res) => {
    try {
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
  })
  .post(async (req, res) => {
    // under progress
  });

module.exports = router;
