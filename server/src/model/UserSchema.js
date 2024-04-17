// create a user schema using mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: {
        type: Array,
        maxlength: 50,
        default: []
    },
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);