#!/usr/bin/node

const request = require('request');
const apiURL = process.argv[2];
const characterID = 18;

request(apiURL, (err, response, body) => {
  if (err) {
    console.error(err);
  } else {
    const movieData = JSON.parse(body).results;
    const moviesWithWedgeAntilles = movieData.filter((movie) =>
      movie.characters.some((character) => character.includes(`/people/${characterID}/`))
    );
    console.log(moviesWithWedgeAntilles.length);
  }
});
