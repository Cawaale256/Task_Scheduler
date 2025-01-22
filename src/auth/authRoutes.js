const http = require('http');
const { registerUser, loginUser } = require('./authController');
const { register } = require('module');

//Create an HTTP server that handles incoming requests and responses
const server = http.createServer((req, res) => {
    // Check if the request is a POST request to the /api/auth/register URL
    if (req.method === 'POST' && req.url === 'api/auth/register') {
        // Initialize a variable to store the request body data
    let body ='';
    // Collect the data chunks
    req.on('data', chunk =>{
        body+=chunk.toString();

    });
    //When all data is received, parse it and call registerUser
    req.on('end', ()=>{
        const userData = JSON.parse(body);
        registerUser(userData,res);
    });
     // Check if the request method is POST and the URL is /api/auth/login
    } else if (req.method === 'POST' && req.url === 'api/auth/login'){
        let body ='';
        req.on('data', chunk =>{
            body+= chunk.toString();
        });
        req.on('end',()=>{
            const userData = JSON.parse(body);
            loginUser(userData,res);
        });
    } else {
        // If the route is not found, return a 404 status code
        res.statusCode = 404;
        res.end('Not found');
    }

});

// Define the port number to listen on, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;



