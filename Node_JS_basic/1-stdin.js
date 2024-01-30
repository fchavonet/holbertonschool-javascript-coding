// Display a message prompting the user for their name.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Set the encoding of the standard input stream to UTF-8.
process.stdin.setEncoding('utf8');

// Listen for data events on the standard input stream.
process.stdin.on('data', (data) => {
  // Convert the input data to a string and remove leading/trailing whitespace.
  const input = data.toString().trim();

  // Check if there is any input provided by the user.
  if (input) {
    // If input is provided, display a message with the user's name.
    process.stdout.write(`Your name is: ${input}\n`);
  }

  // Display a closing message.
  process.stdout.write('This important software is now closing\n');

  // Exit the Node.js process.
  process.exit();
});
