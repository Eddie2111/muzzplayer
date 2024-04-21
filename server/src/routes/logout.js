const express = require('express');
const router = express.Router();
const Users = require("../model/UserSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const successResult = {
    message:"logged out successfully",
    status: 200
}
const wrongPassword = {
    message: "wrong password provided",
    status: 200
}
const wrongEmail = {
    message: "no user with that email",
    status: 200
}
const operationFault = {
    message: "error while executing db operations"
}

router
    .route('/')
    .get(async(req,res)=>{
        res.cookie("user", token, {
            path: "/",
            secure: true,
            httpOnly: true,
            expires: Date.now(),
        });
        res.json(successResult)
        res.end();
    })
    .post(async(req,res)=>{
        try{
            const {email,password} = req.body;
            const response = await Users.findOne({
                email:email
            });
            if (!response) {
                return res.json(wrongEmail);
            }
            const passwordCheck = bcrypt.compareSync(password || " ", response.password || " ");
            if(passwordCheck){
                const token = jwt.sign(
                    {
                        email: email,
                        id: response.id
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: 60 * 60 * 30 }
                )
                res.cookie('user', token, { path: '/', secure: true, httpOnly: true, expires: new Date(Date.now() + 60*60*30) });
                res.json(successResult)
                res.end()
                return;
            } else {
                return res.json(wrongPassword)
            }
        }
        catch(err){
            console.log(err)
            return res.json(operationFault)
        }
    });

module.exports = router;