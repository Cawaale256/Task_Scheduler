const http = require('http');
const { createTask, readTask, updateTask, deleteTask } = require('./taskController');

// Create an HTTP server that handles incoming requests and responses
const server = http.createServer((req, res) => {
    // Check if the request is a POST request to the /api/tasks URL
    if (req.method === 'POST' && req.url === '/api/tasks') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const taskData = JSON.parse(body);
            createTask(taskData, res);
        });
    // Check if the request is a GET request to the /api/tasks URL
    } else if (req.method === 'GET' && req.url === '/api/tasks') {
        readTask(req, res);
    // Check if the request is a PUT request to the /api/tasks/:id URL
    } else if (req.method === 'PUT' && req.url.startsWith('/api/tasks/')) {
        const id = req.url.split('/').pop();
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updates = JSON.parse(body);
            updateTask({ params: { id }, body: updates }, res);
        });
    // Check if the request is a DELETE request to the /api/tasks/:id URL
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/tasks/')) {
        const id = req.url.split('/').pop();
        deleteTask({ params: { id } }, res);
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
