const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Attempt to read the file asynchronously
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        // If an error occurs, reject the Promise
        reject(new Error('Cannot load the database'));
      } else {
        // Split the data by lines
        const lines = data.trim().split('\n');

        // Initialize variables to count students in each field
        let csCount = 0;
        let sweCount = 0;
        const csList = [];
        const sweList = [];

        // Iterate through each line
        for (const line of lines) {
          const fields = line.split(',');
          const [firstName, lastName, age, field] = fields;

          // Check if the line is not empty and all fields are present
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

        // Log the number of students and their lists
        console.log(`Number of students: ${csCount + sweCount}`);
        console.log(`Number of students in CS: ${csCount}. List: ${csList.join(', ')}`);
        console.log(`Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`);

        // Resolve the Promise
        resolve();
      }
    });
  });
}

module.exports = countStudents;
