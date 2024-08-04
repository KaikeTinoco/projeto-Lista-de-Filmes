const modalContainerElement = document.getElementById("modal-container");


let currentMovie = {}


function createModal(json) {
  currentMovie = json;
  modalContainerElement.innerHTML = `
  <h2 id="movie-title">${json.Title} - ${json.Year}</h2>
  <section id="modal-body">
  <img 
  src="${json.Poster}" 
  alt="Poster do filme"
  />
  <div id="movie-info">
  <h3 id="movie-plot">
  <p id="movie-plot-text">${json.Plot}</p>
  </h3>
  <div id="movie-cast">
  <h4>Elenco:</h4>
  <h5 id="movie-cast-text">${json.Actors}</h5>
  </div>
  <div id="movie-genre">
  <h4>Gênero:</h4>
  <h5 id="movie-genre-text">${json.Genre}</h5>
  </div>
  </div>
  </section>
  <section id="modal-footer">
  <button id="put-to-list-button" onclick="addCurrentMovieToList()">Adicionar à Lista</button>
  </section>
  `;
}

function addCurrentMovieToList() {
movieArray.push(currentMovie);
placeModalonList(currentMovie)
}

