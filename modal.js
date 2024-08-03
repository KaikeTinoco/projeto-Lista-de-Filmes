const overlay = document.getElementById("modal-overlay");
const background = document.getElementById("modal-background");
const tituloFilme = document.getElementById("movieName");
const anoFilme = document.getElementById("movieYear");
const searchButton = document.getElementById("search-button");
const moviePoster = document.getElementById("movie-poster");
const moviePlot = document.getElementById("movie-plot-text");
const movieGenre = document.getElementById("movie-genre-text");
const movieCast = document.getElementById("movie-cast-text");
const movieTitleModal = document.getElementById("movie-title");


function backgroundClickHandler() {
  overlay.classList.remove("open");
}
background.addEventListener("click", backgroundClickHandler);

searchButton.addEventListener("click", () =>
  movieQuery(tituloFilme.value, anoFilme.value)
);

async function movieQuery(title, year = null) {
  try {
    if (title === "" || title === null) {
      console.log("O título está vazio!");
      return null;
    }

    let movieTitle = title.replace(/ /g, "+");
    let url = `http://www.omdbapi.com/?apikey=7da988f9&t=${movieTitle}`;
    if (year) {
      url += `&y=${year}`;
    }

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let jsonResult = await response.json();
    movieTitleModal.innerText = `"${jsonResult.Title}" - ${jsonResult.Year}`;
    moviePoster.src = jsonResult.Poster;
    moviePlot.innerText = jsonResult.Plot;
    movieGenre.innerText = jsonResult.Genre;
    movieCast.innerText = jsonResult.Actors;
    overlay.classList.add("open");
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}
