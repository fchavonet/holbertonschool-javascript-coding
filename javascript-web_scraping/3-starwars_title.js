#!/usr/bin/node

const request = require('request');
const movieID = process.argv[2];
const apiURL = `https://swapi-api.hbtn.io/api/films/${movieID}`;

request(apiURL, (err, response, body) => {
  if (err) {
    console.error(err);
  } else {
    const movieData = JSON.parse(body);
    console.log(movieData.title);
  }
});
