'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const GetEnv = require('./env');

app.listen(port, async() => {
    const env = await GetEnv();
    console.log(`Server running on port ${port}`);
});