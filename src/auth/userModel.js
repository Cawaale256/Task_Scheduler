const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const user=mongoose.model('user', 'userSchema');
module.exports = user;