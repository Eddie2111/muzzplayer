const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    song: {
        type: String,
        required: true,
    },
}, { collection: 'songs' });

module.exports = mongoose.model('Song', SongSchema);