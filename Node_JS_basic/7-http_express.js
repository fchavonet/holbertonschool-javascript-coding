// Importing necessary modules
const express = require('express');
const fs = require('fs').promises;

// Creating an Express application instance
const app = express();
const port = 1245;

// Asynchronous function to count students from a database file
async function countStudents(path) {
  try {
    // Read the database file
    const data = await fs.readFile(path, 'utf8');
    // Split data into lines and remove leading/trailing whitespaces
    const lines = data.trim().split('\n').slice(1);

    // Initialize counters and lists for CS and SWE students
    let csCount = 0;
    let sweCount = 0;
    const csList = [];
    const sweList = [];

    // Process each line of student data
    lines.forEach((line) => {
      // Split each line into fields and extract first name and field
      const [firstName, , , field] = line.split(',').map((item) => item.trim());
      // Update counters and lists based on the field
      if (field === 'CS') {
        csCount += 1;
        csList.push(firstName);
      } else if (field === 'SWE') {
        sweCount += 1;
        sweList.push(firstName);
      }
    });

    // Construct the response with student counts and lists
    const response = [
      `Number of students: ${lines.length}`,
      `Number of students in CS: ${csCount}. List: ${csList.join(', ')}`,
      `Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`,
    ];

    return response.join('\n'); // Return the response as a string
  } catch (err) {
    return 'Cannot load the database'; // Return an error message if unable to load the database
  }
}

// Define route handlers
app.get('/', (req, res) => {
  res.send('Hello Holberton School!'); // Respond with a simple greeting
});

app.get('/students', async (req, res) => {
  try {
    const path = process.argv[2]; // Get the database file path from command line arguments
    const studentData = await countStudents(path); // Retrieve student data asynchronously
    res.send(`This is the list of our students\n${studentData}`); // Send the student data as a response
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`); // Handle errors by sending an appropriate error response
  }
});

// Start the server and listen for incoming connections
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export the Express application instance
