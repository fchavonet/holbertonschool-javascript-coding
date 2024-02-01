const express = require('express');

// Create Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
const port = 1245;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/!`);
});

module.exports = app;
