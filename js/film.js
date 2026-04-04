/* =============================================
   film.js — Logica della pagina del singolo film
   Legge l'ID dall'URL e carica i dati del film
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {

  // ===== PROTEZIONE ROTTA =====
  // Se l'utente non è loggato, lo manda al login
  if (!getUtenteLoggato()) {
    window.location.href = "login.html";
    return;
  }

  // ===== LEGGI L'ID DALL'URL =====
  // Esempio URL: film.html?id=3
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    // Nessun ID nell'URL: torna alla homepage
    window.location.href = "index.html";
    return;
  }

  // ===== CERCA IL FILM NEL CATALOGO =====
  const film = getFilmById(id);

  if (!film) {
    document.getElementById("movie-title-detail").textContent = "Film non trovato.";
    return;
  }

  // ===== POPOLA LA PAGINA CON I DATI DEL FILM =====

  // Aggiorna il titolo del browser
  document.title = film.titolo + " — FreeTv One";

  // Poster (emoji come placeholder)
  document.getElementById("movie-poster-large").textContent = film.emoji;

  // Titolo
  document.getElementById("movie-title-detail").textContent = film.titolo;

  // Badge anno, genere, durata
  document.getElementById("movie-year-detail").textContent     = film.anno;
  document.getElementById("movie-genre-detail").textContent    = film.genere;
  document.getElementById("movie-duration-detail").textContent = film.durata + " min";

  // Descrizione
  document.getElementById("movie-desc-detail").textContent = film.desc;

  // Imposta il src del video nel player (ma non lo mostra ancora)
  document.getElementById("video-source").src = film.video;
});

/**
 * Mostra il player video e avvia la riproduzione.
 * Viene chiamata dal pulsante "Guarda il Film".
 */
function showPlayer() {
  const player    = document.getElementById("player-container");
  const video     = document.getElementById("video-player");
  const btnPlay   = document.getElementById("btn-play");

  // Mostra il player
  player.style.display = "block";

  // Ricarica il source e avvia il video
  video.load();
  video.play().catch(function (errore) {
    // Il browser potrebbe bloccare l'autoplay: in quel caso l'utente
    // potrà premere play manualmente nel controllo HTML del video
    console.log("Autoplay non disponibile:", errore.message);
  });

  // Nasconde il pulsante "Guarda il Film"
  btnPlay.style.display = "none";

  // Scorre automaticamente fino al player
  player.scrollIntoView({ behavior: "smooth" });
}

/**
 * Nasconde il player video e mette in pausa il video.
 * Viene chiamata dal pulsante "Chiudi player".
 */
function hidePlayer() {
  const player  = document.getElementById("player-container");
  const video   = document.getElementById("video-player");
  const btnPlay = document.getElementById("btn-play");

  // Pausa e nasconde il player
  video.pause();
  player.style.display = "none";

  // Ripristina il pulsante
  btnPlay.style.display = "inline-block";
}
