

const overlay = document.getElementById("modal-overlay");
const searchButton = document.getElementById("search-button");
const background = document.getElementById("modal-background");
const tituloFilme = document.getElementById("movieName");
const anoFilme = document.getElementById("movieYear");
const movieList = document.getElementById("movie-list");

searchButton.addEventListener("click", () =>
  movieQuery(tituloFilme.value, anoFilme.value)
);

let movieArray = JSON.parse(localStorage.getItem("movieArray")) ?? []

for (const movieInfo of movieArray) {
  placeModalonList(movieInfo);
}

async function movieQuery(title, year = null) {
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
        throw new Error("ano do filme inválido");
      }
    }

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let jsonResult = await response.json();

    if (jsonResult.Title && !isMovieInList(jsonResult, movieArray)) {
      createModal(jsonResult);
      overlay.classList.add("open");
      background.addEventListener("click", backgroundClickHandler);
      addToListButton = document.getElementById("put-to-list-button");
      addToListButton.addEventListener("click", () => {
        modalContainerElement.innerHTML = "";
        overlay.classList.remove("open");
      });
    } else if (!jsonResult.Title) {
      throw new Error("filme não encontrado");
    } else {
      throw new Error("filme ja adicionado na lista!");
    }
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function removeModalFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme da lista?",
    submitText: "sim",
    cancelText: "não",
    position: "top",
    submitCallback: function removeMovie() {
      movieArray = movieArray.filter((movie) => movie.imdbID !== id);
      updateLocalStorage();
      document.getElementById(id).remove();
    },
  })
  
}

function backgroundClickHandler() {
  overlay.classList.remove("open");
}

function placeModalonList(json) {
  movieList.innerHTML += `
        <article id="${json.imdbID}">
          <img src="${json.Poster}" alt="poster do filme" id="movie-poster-list">
          <button class="remove-button" id="remove-button" onclick="removeModalFromList('${json.imdbID}')">Remover<i class="bi bi-trash"></i></button>
          </article>
          `;
}

function isMovieInList(json, movies) {
  let jsonId = json.imdbID;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === jsonId) {
      return true;
    }
  }
  return false;
}

function updateLocalStorage(){
  localStorage.setItem("movieArray", JSON.stringify(movieArray));
}
