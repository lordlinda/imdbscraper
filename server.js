const express = require("express");
const app = express();
const { searchMovies, getMovie } = require("./scraper");
//   /search/:title
app.get("/search/:title", (req, res) => {
  searchMovies(req.params.title).then((movies) => {
    res.json(movies);
  });
});

app.get("/search/:imdbDB", (req, res) => {
  getMovie(req.params.imdbDB).then((movie) => {
    res.json(movie);
  });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.info(`Server listen on port ${PORT}`);
});
