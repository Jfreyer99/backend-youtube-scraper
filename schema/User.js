const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;