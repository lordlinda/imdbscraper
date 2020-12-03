const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = "https://imdbscraperclone.herokuapp.com";
const main = document.querySelector("main");

function getMovie(imdbID) {
  return fetch(`${BASE_URL}/movie/${imdbID}`).then((res) => res.json());
}

const getGenres = (genres) => {
  genres.map((genre) => {
    `<p>${genre}</p>`;
  });
};
function showMovie(movie) {
  console.log(movie);
  const section = document.createElement("section");
  main.appendChild(section);
  section.outerHTML = `
  <section class ='row description'>
 
<div>
<img src="${movie.poster}" class=""/>
</div>
<dl class="row">
  <dt class="col-sm-3">${movie.title}</dt>
  <dd class="col-sm-9">${movie.summary}</dd>

  <dt class="col-sm-3">Story line</dt>
  <dd class="col-sm-9">
   
    <p>${movie.storyline}</p>
  </dd>

  <dt class="col-sm-3">Run time</dt>
  <dd class="col-sm-9">${movie.runTime}</dd>

  <dt class="col-sm-3 text-truncate">Rating</dt>
  <dd class="col-sm-9">${movie.imdbRating}</dd>

  
  </section>
  `;
}

getMovie(imdbID).then(showMovie);
