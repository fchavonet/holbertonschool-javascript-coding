import fs from 'fs';

// Function to read the database from a given dataPath
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  // Check if dataPath is not provided, reject with an error
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  // If dataPath is provided
  if (dataPath) {
    // Read the file asynchronously
    fs.readFile(dataPath, (err, data) => {
      // If there's an error reading the file, reject with an error
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      // If data is available
      if (data) {
        // Convert data to string, trim whitespace, and split by lines
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        // Extract field names from the first line of the file
        const dbFieldNames = fileLines[0].split(',');
        // Extract property names (excluding the last one which is assumed to be the field)
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        // Iterate through each line of the file (excluding the first line)
        for (const line of fileLines.slice(1)) {
          // Split the line into an array of values
          const studentRecord = line.split(',');
          // Extract property values (excluding the last one which is assumed to be the field)
          const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
          // Extract the field value from the last element of the array
          const field = studentRecord[studentRecord.length - 1];

          // If the field is not a key in studentGroups, initialize it as an empty array
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          // Map property names to property values and construct an object
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);
          // Push the constructed object to the corresponding field in studentGroups
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }
        // Resolve the promise with the constructed studentGroups object
        resolve(studentGroups);
      }
    });
  }
});

// Export the readDatabase function as the default export
export default readDatabase;
// Export the readDatabase function for CommonJS modules compatibility
module.exports = readDatabase;
