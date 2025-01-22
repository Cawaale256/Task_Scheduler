const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-auth-token'];

    // Check if no token is provided
    if (!token) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ msg: 'No token, authorization denied' }));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);
        // Attach the user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.statusCode = 401;
        res.end(JSON.stringify({ msg: 'Token is not valid' }));
    }
    
module.exports = authMiddleware;