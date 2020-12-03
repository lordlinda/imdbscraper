const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = "https://imdbscraperclone.herokuapp.com";

function getMovie(imdbID) {
  return fetch(`${BASE_URL}/search/${imdbID}`).then((res) => res.json());
}

function showMovie(movie) {
  console.log(movie);
}

getMovie(imdbID).then(showMovie);
