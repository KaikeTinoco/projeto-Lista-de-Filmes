const modalContainerElement = document.getElementById("modal-container");

function createModal() {
  modalContainerElement.innerHTML = `
    <h2 id="movie-title"></h2>
          <section id="modal-body">
            <img
            id="movie-poster" 
            src="" 
            alt="Poster do filme"
            />
            <div id="movie-info">
              <h3 id="movie-plot">
                <p id="movie-plot-text"></p>
              </h3>
              <div id="movie-cast">
                <h4>Elenco:</h4>
                <h5 id="movie-cast-text"></h5>
              </div>
              <div id="movie-genre">
                <h4>Gênero:</h4>
                <h5 id="movie-genre-text"></h5>
              </div>
            </div>
          </section>
          <section id="modal-footer">
            <button id="put-to-list-button">Adicionar à Lista</button>
          </section>
  `;
}

function placeModalonList() {
  movieList.innerHTML += `
        <article>
          <img src="" alt="poster do filme" id="movie-poster-list">
          <button class="remove-button" id="remove-button">Remover<i class="bi bi-trash"></i></button>
        </article>
  
  `;
}
