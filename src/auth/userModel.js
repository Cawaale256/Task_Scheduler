const mongoose = require('mongoose');

const userSchema = new mongoose.userSchema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: user
    }
});

const user=mongoose.model('user', 'userSchema');
module.exports = user;