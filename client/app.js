const BASE_URL = "https://imdbscraperclone.herokuapp.com";

const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const List = document.querySelector("#results");

form.addEventListener("submit", formSubmitted);

function formSubmitted(e) {
  e.preventDefault();
  const searchTerm = searchInput.value;
  getSearchResults(searchTerm);
}

function getSearchResults(searchterm) {
  return fetch(`${BASE_URL}/search/${searchterm}`)
    .then((res) => res.json())
    .then((results) => {
      console.log(results);
      results.forEach((item) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        li.appendChild(img);
        img.src = item.image;
        const a = document.createElement("a");
        //li.id = ;
        a.textContent = item.title;
        a.href = "/movie.html?imdbID=" + item.imdbID;
        li.appendChild(a);
        List.appendChild(li);
      });
    });
}
