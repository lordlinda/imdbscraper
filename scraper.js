const fetch = require("node-fetch");
const cheerio = require("cheerio");
const searchUrl = "https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=";
const movieUrl = "https://www.imdb.com/title/";
const movieCache = {};
const searchCache = {};
function searchMovies(searchterm) {
  if (searchCache[searchterm]) {
    console.log("serving from cache");

    return Promise.resolve(searchCache[searchterm]);
  }
  return fetch(`${searchUrl}${searchterm}`)
    .then((response) => response.text())
    .then((body) => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".findResult").each(function (i, element) {
        const $element = $(element);
        const $image = $element.find("td a img");
        const $title = $element.find("td.result_text a");
        const imdbID = $title.attr("href").match(/title\/(.*)\//)[1];

        const movie = {
          image: $image.attr("src"),
          title: $title.text(),
          imdbID,
        };

        movies.push(movie);
      });
      searchCache[searchterm] = movies;
      return movies;
    });
}

function getMovie(imdbID) {
  if (movieCache[imdbID]) {
    console.log("serving from cache");
    return Promise.resolve(movieCache[imdbID]);
  }
  return fetch(`${movieUrl}${imdbID}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      const $title = $(".title_wrapper h1");
      const title = $title
        .first()
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();
      const rating = $('meta[itemProp="contentRating"]').attr("content");
      const runTime = $("div.txt-block time")
        .first()
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();

      function getItems(itemArray) {
        return function (i, element) {
          const item = $(element).text();
          itemArray.push(item);
        };
      }

      const genres = [];
      $("#titleStoryLine div h4:contains('Genres')").each(function (
        i,
        element
      ) {
        const item = $(element).parent().children("a").text();
        genres.push(item);
      });
      const datePublished = $('meta[itemProps="datePublished"]').attr(
        "content"
      );
      const imdbRating = $("span[itemProp='ratingValue']").text();
      const poster = $("div.poster a img").attr("src");
      const summary = $("div.summary_text").text().trim();

      const stars = [];
      $("table.cast_list tbody tr").each(function (i, element) {
        const item = $(element).find("td:nth-child(2) a").text().trim();
        stars.push(item);
      });
      const storyline = $("#titleStoryLine div p").text().trim();

      const trailer = $("div.slate a").attr("href");
      const movie = {
        imdbID,
        title,
        rating,
        runTime,
        genres,
        datePublished,
        imdbRating,
        poster,
        summary,
        stars,
        storyline,
        trailer: `https://www.imdb.com${trailer}`,
      };
      movieCache[imdbID] = movie;
      return movie;
    });
}

module.exports = { searchMovies, getMovie };
