// server.js
const http = require('http');
const fs = require('fs');
const os = require('os');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Serve the HTML file
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    // Endpoint to get the hostname
    else if (req.url === '/hostname') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(os.hostname());
    }
    // Endpoint to get the username
    else if (req.url === '/whoami') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(os.userInfo().username);
    }
    // Handle other requests
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

