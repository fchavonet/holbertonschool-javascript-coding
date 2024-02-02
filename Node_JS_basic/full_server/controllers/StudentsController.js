import readDatabase from '../utils';

// Valid majors for filtering students
const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  // Controller method to get all students
  static getAllStudents(request, response) {
    // Get the data path from command line arguments or set to an empty string
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    // Read the database asynchronously
    readDatabase(dataPath)
      .then((studentGroups) => {
        // Initialize response parts with a starting message
        const responseParts = ['This is the list of our students'];

        // Comparator function for sorting student groups
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        // Iterate through each student group and construct response parts
        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        // Send the response with 200 status and joined response parts
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        // Handle errors by sending 500 status and error message
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  // Controller method to get all students by major
  static getAllStudentsByMajor(request, response) {
    // Get the data path from command line arguments or set to an empty string
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';
    // Get the major from request parameters
    const { major } = request.params;

    // Validate the major
    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Read the database asynchronously
    readDatabase(dataPath)
      .then((studentGroups) => {
        let responseText = '';

        // If the major exists in the student groups, construct the response text
        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }
        // Send the response with 200 status and response text
        response.status(200).send(responseText);
      })
      .catch((err) => {
        // Handle errors by sending 500 status and error message
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
