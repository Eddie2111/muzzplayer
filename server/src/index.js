'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT;
const GetEnv = require('./env');
const mongoDB = require('./lib/mongo');
const cors = require('cors');
const multar = require('multer');
const path = require('path');
const fs = require('fs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));
const corsOptions ={
    origin:'*',  //https://mighty-dusk-25399.herokuapp.com/
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,POST",  //    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,

}  
app.use(cors(corsOptions))

const storage = multar.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const formidable = require('formidable');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
app.use('/music', express.static('public/songs'));
const Songs = require('./routes/songs');
app.use('/getsongs', Songs);

app.post('/songs', async (req, res) => {
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

            // Read the file from uploadedFilePath
            const data = await readFile(uploadedFilePath);

            // Write the file to newFilePath
            await writeFile(newFilePath, data);

            // Delete the file from uploadedFilePath
            await unlink(uploadedFilePath);

            // Send the response to the client
            res.json({
                message: 'File uploaded successfully.',
                title: fields.title,
                artist: fields.artist,
                path: `/songs/${originalFilename}`
            })
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

// const SongsRoute = require('./routes/songs');
// app.use('/songs', SongsRoute);


app.listen(3200, async() => {
    // await mongoDB();
    const env = await GetEnv();
    console.log(`Server running on port ${env.PORT}`);
});