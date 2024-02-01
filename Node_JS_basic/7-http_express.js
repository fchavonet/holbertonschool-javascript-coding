const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n').slice(1);

    let csCount = 0;
    let sweCount = 0;
    const csList = [];
    const sweList = [];

    lines.forEach((line) => {
      const [firstName, , , field] = line.split(',').map((item) => item.trim());
      if (field === 'CS') {
        csCount += 1;
        csList.push(firstName);
      } else if (field === 'SWE') {
        sweCount += 1;
        sweList.push(firstName);
      }
    });

    const response = [
      `Number of students: ${lines.length}`,
      `Number of students in CS: ${csCount}. List: ${csList.join(', ')}`,
      `Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`,
    ];

    return response.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const path = process.argv[2];
    const studentData = await countStudents(path);
    res.send(`This is the list of our students\n${studentData}`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
