const express = require("express");
const axios = require("axios");

const indoorRouter = express.Router();

indoorRouter.use((req, res, next) => {
  next();
});

indoorRouter.get("/movies/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  const tmdbMovieURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.TMDB_APIKEY}`;
  try {
    const movieResponse = await axios.get(tmdbMovieURL);
    let movieData = movieResponse.data.results;
    res.json(movieData);
  } catch (error) {
    console.log(
      "Could not get recomendations based on the specified id. Try again, or try another movie!"
    );
    res.json({ error: "Recomended movies could not be fetched" });
  }
});

indoorRouter.get("/tv/:series_id", async (req, res) => {
  const tv_id = req.params.series_id;
  const tmdbMovieURL = `https://api.themoviedb.org/3/movie/${tv_id}/recommendations?api_key=${process.env.TMDB_APIKEY}`;
  try {
    const movieResponse = await axios.get(tmdbMovieURL);
    let tvData = movieResponse.data.results;
    res.json(tvData);
  } catch (error) {
    console.log(
      "Could not get recomendations based on the specified id. Try again, or try another series!"
    );
    res.json({ error: "Recomended series could not be fetched" });
  }
});

indoorRouter.get("/trivia", async (req, res) => {
  const question_count = req.query.amount;
  const selected_difficulty = req.query.difficulty;
  const selected_category = req.query.category;
  const selected_playStyle = req.query.type;
  let triviaURL = `https://opentdb.com/api.php?`;
  let category = "";
  let difficulty = "";
  let count = "";
  let playStyle = "";
  if (selected_category) {
    category = `category=${selected_category}`;
  }
  if (selected_difficulty) {
    difficulty = `difficulty=${selected_difficulty}`;
  }
  if (selected_playStyle) {
    playStyle = `type=${selected_playStyle}`;
  }
  if (question_count) {
    count = `amount=${question_count}`;
  }
  triviaURL = triviaURL + `${count}&${category}&${difficulty}&${playStyle}`;
  try {
    const triviaResponse = await axios.get(triviaURL);
    let triviaData = triviaResponse.data.results;
    res.json(triviaData);
  } catch (error) {
    console.log(`Could not get trivia ${question_count} questions, try again!`);
    res.json({ error: "Trivia could not be fetched" });
  }
});

indoorRouter.get("/random", async (req, res) => {
  const boredURL = "https://www.boredapi.com/api/activity/";
  try {
    const boredResponse = await axios.get(boredURL);
    let boredData = boredResponse.data;
    res.json(boredData);
  } catch (error) {
    console.log(`Could not get a random activity, try again!`);
    res.json({ error: "Random activity could not be fetched" });
  }
});

indoorRouter.get("/games", async (req, res) => {
  let pageIndex = 1;
  const gameURL = `https://api.rawg.io/api/games?key=${process.env.RAWG_APIKEY}&page=${pageIndex}`;
  try {
    const gameResponse = await axios.get(gameURL);
    let gameData = gameResponse.data;
    res.json(gameData);
  } catch (error) {
    console.log("Could not get game recomendations, try again!");
    res.json({ error: "Recomended games could not be fetched" });
  }
});

module.exports = {
  indoorRouter,
};
