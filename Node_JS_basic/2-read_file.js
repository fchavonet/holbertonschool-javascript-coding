const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously.
    const data = fs.readFileSync(path, 'utf8').trim();

    // Split the data by lines.
    const lines = data.split('\n');

    // Initialize variables to count students in each field.
    let csCount = 0;
    const csList = [];
    let sweCount = 0;
    const sweList = [];

    // Iterate through each line.
    for (const line of lines) {
      const fields = line.split(',');
      const [firstName, lastName, age, field] = fields;

      // Check if the line is not empty
      if (firstName && lastName && age && field) {
        if (field === 'CS') {
          csCount += 1;
          csList.push(firstName);
        } else if (field === 'SWE') {
          sweCount += 1;
          sweList.push(firstName);
        }
      }
    }

    // Log the number of students and their lists.
    console.log(`Number of students: ${csCount + sweCount}`);
    console.log(`Number of students in CS: ${csCount}. List: ${csList.join(', ')}`);
    console.log(`Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`);
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
