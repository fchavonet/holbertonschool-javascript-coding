const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => {
    return new Promise((resolve, reject) => {
        if (!dataPath) {
            reject(new Error('Cannot load the database'));
        } else {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error('Cannot load the database'));
                } else {
                    const reportParts = [];
                    const fileLines = data.trim().split('\n');
                    const studentGroups = {};
                    const dbFieldNames = fileLines[0].split(',');
                    const studentPropNames = dbFieldNames.slice(
                        0,
                        dbFieldNames.length - 1
                    );

                    for (const line of fileLines.slice(1)) {
                        const studentRecord = line.split(',');
                        const studentPropValues = studentRecord.slice(
                            0,
                            studentRecord.length - 1
                        );
                        const field = studentRecord[studentRecord.length - 1];
                        if (!Object.keys(studentGroups).includes(field)) {
                            studentGroups[field] = [];
                        }
                        const studentEntries = studentPropNames.map(
                            (propName, idx) => [propName, studentPropValues[idx]]
                        );
                        studentGroups[field].push(Object.fromEntries(studentEntries));
                    }

                    const totalStudents = Object.values(studentGroups).reduce(
                        (pre, cur) => (pre || []).length + cur.length
                    );
                    reportParts.push(`Number of students: ${totalStudents}`);
                    for (const [field, group] of Object.entries(studentGroups)) {
                        reportParts.push(
                            `Number of students in ${field}: ${group.length}. List: ${group
                                .map((student) => student.firstname)
                                .join(', ')}`
                        );
                    }
                    resolve(reportParts.join('\n'));
                }
            });
        }
    });
};

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    const { url } = req;

    if (url === '/') {
        res.end('Hello Holberton School!');
    } else if (url === '/students') {
        if (!DB_FILE) {
            res.end('Error: Database file not provided\n');
            return;
        }

        countStudents(DB_FILE)
            .then((report) => {
                res.end('This is the list of our students\n' + report);
            })
            .catch((error) => {
                res.end(`Error: ${error.message}\n`);
            });
    } else {
        res.statusCode = 404;
        res.end('404 Not Found\n');
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
