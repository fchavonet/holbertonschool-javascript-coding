const http = require('http');
const { countStudents } = require('./3-read_file_async');

const [, , databaseFile] = process.argv;

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const { url } = req;

  if (url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (url === '/students') {
    if (!databaseFile) {
      res.end('Error: Database file not provided\n');
      return;
    }

    countStudents(databaseFile)
      .then(() => {
        res.end('This is the list of our students\n');
      })
      .catch((error) => {
        res.end(`Error: ${error.message}\n`);
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found\n');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
