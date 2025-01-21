const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-auth-token'];

    

module.exports = authMiddleware;