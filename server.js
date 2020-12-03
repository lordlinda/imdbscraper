const express = require("express");
const cors = require("cors");

const app = express();
const { searchMovies, getMovie } = require("./scraper");
//   /search/:title
app.use(cors());
app.get("/search/:title", (req, res) => {
  searchMovies(req.params.title).then((movies) => {
    res.json(movies);
  });
});

app.get("/movie/:imdbDB", (req, res) => {
  getMovie(req.params.imdbDB).then((movie) => {
    res.json(movie);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server listen on port ${PORT}`);
});
