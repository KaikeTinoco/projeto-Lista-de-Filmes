const overlay = document.getElementById("modal-overlay");
const searchButton = document.getElementById("search-button");
const background = document.getElementById("modal-background");
const tituloFilme = document.getElementById("movieName");
const anoFilme = document.getElementById("movieYear");
const movieList = document.getElementById("movie-list");

searchButton.addEventListener("click", () =>
    movieQuery(tituloFilme.value, anoFilme.value)
);

async function movieQuery(title, year = null) {
    createModal();

    const moviePoster = document.getElementById("movie-poster");
    const moviePlot = document.getElementById("movie-plot-text");
    const movieGenre = document.getElementById("movie-genre-text");
    const movieCast = document.getElementById("movie-cast-text");
    const movieTitleModal = document.getElementById("movie-title");
    const addToListButton = document.getElementById("put-to-list-button");
    
    try {
    if (title === "" || title === null) {
      throw new Error("o nome do filme não pode ser vazio");
    }

    let movieTitle = title.replace(/ /g, "+");
    let url = `http://www.omdbapi.com/?apikey=7da988f9&t=${movieTitle}`;

    if (year) {
      if (Number(year) && year.length === 4) {
        url += `&y=${year}`;
      } else {
        /* notie.alert({type : "error", text : "ano do filme inválido"}) */
        throw new Error("ano do filme inválido");
      }
    }

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let jsonResult = await response.json();

    if (jsonResult.Title) {
      movieTitleModal.innerText = `"${jsonResult.Title}" - ${jsonResult.Year}`;
      moviePoster.src = jsonResult.Poster;
      moviePlot.innerText = jsonResult.Plot;
      movieGenre.innerText = jsonResult.Genre;
      movieCast.innerText = jsonResult.Actors;
      overlay.classList.add("open");
      background.addEventListener("click", backgroundClickHandler);
      addToListButton.addEventListener("click", () => {
            overlay.classList.remove("open");
            modalOnList = placeModalonList();
            let posterImg = document.getElementById("movie-poster-list");
            let removeModalButton = document.getElementById("remove-button");
            posterImg.src = jsonResult.Poster
            removeModalButton.addEventListener("click", () => {
                let wholeModal = posterImg.parentElement;
                removeModalFromList(wholeModal);
            });
            
      });
    } else {
      throw new Error("filme não encontrado");
    }
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function removeModalFromList(modal) {
    movieList.removeChild(modal);
}

function backgroundClickHandler() {
  overlay.classList.remove("open");
}
