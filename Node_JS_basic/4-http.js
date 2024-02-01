const http = require('http');

// Create an HTTP server.
const app = http.createServer((req, res) => {
  // Set the response HTTP header with status code 200 and Content-Type text/plain.
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body with "Hello Holberton School!".
  res.end('Hello Holberton School!');
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
