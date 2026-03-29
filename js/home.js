/* =============================================
   home.js — Logica della homepage
   Mostra il catalogo solo se l'utente è loggato
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {

  const utente      = getUtenteLoggato();
  const griglia     = document.getElementById("movies-grid");
  const messaggio   = document.getElementById("catalog-message");
  const heroCta     = document.getElementById("hero-cta");

  if (utente) {
    // ===== UTENTE LOGGATO =====
    // Aggiorna il messaggio introduttivo
    messaggio.textContent = "Ciao " + utente.nome + "! Scegli un film e inizia a guardare.";

    // Nasconde il pulsante "Inizia ora" nella hero (già loggato)
    if (heroCta) heroCta.style.display = "none";

    // Genera le card per ogni film nel catalogo
    CATALOGO_FILM.forEach(function (film) {
      const card = creaCardFilm(film);
      griglia.appendChild(card);
    });

  } else {
    // ===== UTENTE NON LOGGATO =====
    messaggio.textContent = "🔒 Accedi o registrati per guardare i film.";
    // La griglia resta vuota, mostra solo il messaggio
  }
});

/**
 * Crea e ritorna un elemento HTML card per un film.
 * @param {object} film - Oggetto film dal catalogo
 * @returns {HTMLElement}
 */
function creaCardFilm(film) {
  // Contenitore card
  const card = document.createElement("div");
  card.className = "movie-card";

  // Cliccando sulla card si va alla pagina del film
  card.onclick = function () {
    window.location.href = "film.html?id=" + film.id;
  };

  // HTML interno della card
  card.innerHTML = `
    <div class="movie-poster">${film.emoji}</div>
    <div class="movie-card-body">
      <div class="movie-card-title">${film.titolo}</div>
      <div class="movie-card-genre">${film.genere} · ${film.anno}</div>
      <div class="movie-card-desc">${film.desc}</div>
    </div>
    <a class="btn-card">▶ Guarda ora</a>
  `;

  return card;
}
