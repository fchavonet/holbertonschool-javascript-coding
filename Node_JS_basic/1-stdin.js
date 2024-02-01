// Display a message prompting the user for their name.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for data events on the standard input stream.
process.stdin.on('readable', () => {
  // Read the input data from the standard input stream.
  const input = process.stdin.read();

  // Check if there is any input provided by the user.
  if (input !== null) {
    // If input is provided, display a message with the user's name.
    process.stdout.write(`Your name is: ${input}`);
  }
});

process.stdin.on('end', () => {
  // Display a closing message.
  process.stdout.write('This important software is now closing\n');
});
