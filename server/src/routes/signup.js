const express = require('express');
const router = express.Router();

const data = {
    title: "welcome",
    message: "data came from node backend",
    version: "30.11.22"
};
router
    .route('/')
    .get(async(req,res)=>{
        res.send('/signup');
    })
    .post(async(req,res)=>{
        res.json(
            data
        );
    });
module.exports = router;