const express = require('express');

// Create Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <title>Error</title>
        </head>
        <body>
        <pre>Cannot GET ${req.url}</pre>
        </body>
        </html>
    `);
});

// Start the server
const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app; // Export the Express app
