const http = require('http');
const { createTask, readTask, updateTask, deleteTask } = require('./taskController');
const authMiddleware = require('./authMiddleware');

// Create an HTTP server that handles incoming requests and responses
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/tasks') {
        authMiddleware(['user', 'admin'])(req, res, () => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const taskData = JSON.parse(body);
                createTask(taskData, res);
            });
        });
    } else if (req.method === 'GET' && req.url === '/api/tasks') {
        authMiddleware(['user', 'admin'])(req, res, () => {
            readTask(req, res);
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/api/tasks/')) {
        authMiddleware(['user', 'admin'])(req, res, () => {
            const id = req.url.split('/').pop();
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const updates = JSON.parse(body);
                updateTask({ params: { id }, body: updates }, res);
            });
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/tasks/')) {
        authMiddleware(['admin'])(req, res, () => {
            const id = req.url.split('/').pop();
            deleteTask({ params: { id } }, res);
        });
    } else {
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

