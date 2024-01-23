#!/usr/bin/node

const request = require('request');
const apiURL = process.argv[2];

request(apiURL, (err, response, body) => {
  if (err) {
    console.error(err);
  } else {
    const todos = JSON.parse(body);
    const completedTasksByUser = {};

    todos.forEach((todo) => {
      if (todo.completed) {
        if (completedTasksByUser[todo.userId]) {
          completedTasksByUser[todo.userId]++;
        } else {
          completedTasksByUser[todo.userId] = 1;
        }
      }
    });

    console.log(completedTasksByUser);
  }
});
