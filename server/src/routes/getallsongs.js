const express = require('express');
const router = express.Router();
const Songs = require('../model/SongSchema');

router
    .route('/')
    .get(async(req,res)=>{
        const data = await Songs.find({});
        let genres = [];
        let singers = [];
        data.forEach(song=>{
            if(!genres.includes(song.genre)){
                genres.push(song.genre);
            }
        });
        let blocks = '';
        function ReInsert(song){
            if(!blocks.includes(song)){
                singers.push(song.trim());
            }
        }
        data.forEach(song=>{
            if(!singers.includes(song.artist)){
                let blocks = song.artist.split(',');
                blocks.forEach(ReInsert);
            }
        });
        res.json(
            {
                method:req.method,
                data: {
                    genres: genres,
                    songs: data,
                    singers: singers,
                },
                status: res.statusCode,
            }
        );
    })
    .post(async(req,res)=>{
        res.json(
            {
                method:req.method,
                data: [],
                status: res.statusCode,
            }
        );
    });
module.exports = router;