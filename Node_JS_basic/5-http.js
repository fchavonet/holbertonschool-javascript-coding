// Importing necessary modules
const http = require('http');
const fs = require('fs');

// Server configurations
const PORT = 1245;
const HOST = 'localhost';
// Creating a HTTP server instance
const app = http.createServer();
// Database file path
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

// Function to count the number of students from a database file
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Reject the promise if the database path is not provided
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  // Read the database file asynchronously
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        // Reject the promise if unable to read the database file
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        // Array to store different parts of the report
        const reportParts = [];
        // Splitting file data into lines
        const fileLines = data.toString('utf-8').trim().split('\n');
        // Object to store student groups based on a field
        const studentGroups = {};
        // Extracting field names from the first line
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(
          0,
          // Excluding the last field which is the group field
          dbFieldNames.length - 1,
        );

        // Parsing data from the database file
        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        // Generating a report with student data
        const totalStudents = Object.values(studentGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n')); // Resolve promise with the generated report
      }
    });
  }
});

// Handlers for different server routes
const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      // Set response headers and send the response
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      // Handling student route and sending response
      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

// Handling incoming requests based on defined route handlers
app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

// Starting the server and listening for incoming connections
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Exporting the server module
module.exports = app;
