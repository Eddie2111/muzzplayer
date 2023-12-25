const mongoose = require('mongoose');
const GetEnv = require('../env');

let mongoDBConn = null;
const mongoDB = async() => {
    const env = await GetEnv();
    if (mongoDBConn) {
        return mongoDBConn;
    }
    mongoDBConn = await mongoose.connect(env.DB_URL);
    return mongoDBConn;
};

module.exports = mongoDB;
