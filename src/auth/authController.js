const User = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Register a new user
// Define an asynchronous function named registerUser that takes userData and res as parameters
const registerUser = async (userData, res) => {
    // Destructure username and password from userData
    const { username, password } = userData;
    try {
        // Attempt to find an existing user with the same username
        let user = await User.findOne({ username });
        if (user) {
            // If a user with the same username exists, set status code to 400 (Bad Request)
            res.statusCode = 400;
            // Send a JSON response indicating that the user already exists and return
            return res.end(JSON.stringify({ msg: 'User already exists' }));
        }
        // If no existing user is found, create a new user with the provided username and password
        user = new User({ username, password });
        // Save the new user to the database
        await user.save();
        // Set status code to 201 (Created)
        res.statusCode = 201;
        // Send a JSON response indicating that the user was registered successfully
        res.end(JSON.stringify({ msg: 'User registered successfully' }));
    } catch (err) {
        // If an error occurs, set status code to 500 (Internal Server Error)
        res.statusCode = 500;
        // Send a JSON response indicating a server error
        res.end(JSON.stringify({ msg: 'Server error' }));
    }
};

