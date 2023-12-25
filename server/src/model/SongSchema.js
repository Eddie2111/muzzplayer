// create a song schema using mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    songName: {
        type: String,
        required: true,
        unique: true
    },
    artistName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
}, { collection: 'songs' });

module.exports = mongoose.model('Song', SongSchema);