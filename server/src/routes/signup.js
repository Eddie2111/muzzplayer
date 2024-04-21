const express = require('express');
const router = express.Router();
const Users = require("../model/UserSchema");
const {v4} = require("uuid");
const bcrypt = require('bcrypt');
router
    .route('/')
    .get(async(req,res)=>{
        res.send('/signup');
    })
    .post(async(req,res)=>{
        try{
            const {email,password} = req.body;
            const hash = bcrypt.hashSync(password,1);
            const dataset = new Users({
                email,
                password:hash,
                id: v4()
            });
            await dataset.save();
            return res.json({
                message: "user created",
                status: 200
            })
        } catch(err) {
            console.log(err.message || err)
            return res.json({
                message: "user was not created due to operational error",
                status: 400
            })
        }
    });
module.exports = router;