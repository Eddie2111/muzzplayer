require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require("../model/UserSchema");
const jwt = require("jsonwebtoken");

router
    .route('/')
    .get(async(req,res)=>{

        const songID = req.params.id;
        const userID = jwt.verify(req.cookies.user, process.env.JWT_SECRET || " ");
        
        try {
            // Find the user and update the favorites list in one operation
            const setNewUserData = await Users.findOneAndUpdate(
                { id: userID.id },
                { $push: { favourites: songID } },
                { new: true }
            );
        
            // Returning response
            return res.json({ setNewUserData, message: "Operation ran successfully" });
            
        } catch (err) {
            console.error(err.message || err);
            return res.status(500).json({
                message: "An error occurred while updating user data",
                status: 500
            });
        }
    })
    .post(async(req,res)=>{
        res.json(
            data
        );
    });
module.exports = router;