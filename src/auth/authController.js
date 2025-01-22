const User = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// const user = require('./userModel');

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

// Login a user
const loginUser = async (userData, res) => {
    // Destructure username and password from userData
    const { username, password } = userData;
    try {
        // Attempt to find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            // If user is not found, set status code to 400 (Bad Request) and send an error message
            res.statusCode = 400;
            return res.end(JSON.stringify({ msg: 'Invalid credentials' }));
        }
        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If password does not match, set status code to 400 (Bad Request) and send an error message
            res.statusCode = 400;
            return res.end(JSON.stringify({ msg: 'Invalid credentials' }));
        }
        // Create a payload with the user's ID and role for the token
        const payload = { userId: user.id, role: user.role };
        // Sign the token with the payload and secret key, setting an expiration time of 1 hour
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
        // Send the token in the response
        res.end(JSON.stringify({ token }));
    } catch (err) {
        // If an error occurs, set status code to 500 (Internal Server Error) and send an error message
        res.statusCode = 500;
        res.end(JSON.stringify({ msg: 'Server error' }));
    }
};

// Export the registerUser and loginUser functions for use in other parts of the application
module.exports = { registerUser, loginUser };
