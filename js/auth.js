/* =============================================
   auth.js — Gestione autenticazione e sessioni
   Usa localStorage per simulare un database
   ============================================= */

/**
 * Registra un nuovo utente.
 * Salva gli utenti in localStorage come array JSON.
 * @param {string} nome - Nome dell'utente
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} - { successo: bool, messaggio: string }
 */
function registraUtente(nome, email, password) {
  // Recupera utenti esistenti (o array vuoto se è la prima volta)
  const utenti = getUtenti();

  // Controlla se l'email è già registrata
  const esistente = utenti.find(u => u.email === email);
  if (esistente) {
    return { successo: false, messaggio: "Email già registrata!" };
  }

  // Crea il nuovo utente e aggiunge alla lista
  const nuovoUtente = { nome, email, password };
  utenti.push(nuovoUtente);

  // Salva nel localStorage
  localStorage.setItem("fto_utenti", JSON.stringify(utenti));

  return { successo: true, messaggio: "Registrazione avvenuta con successo!" };
}

/**
 * Esegue il login di un utente.
 * @param {string} email
 * @param {string} password
 * @returns {object} - { successo: bool, messaggio: string }
 */
function loginUtente(email, password) {
  const utenti = getUtenti();

  // Cerca l'utente con email e password corrispondenti
  const utente = utenti.find(u => u.email === email && u.password === password);

  if (!utente) {
    return { successo: false, messaggio: "Email o password errata." };
  }

  // Salva la sessione: memorizza l'utente loggato
  sessionStorage.setItem("fto_utente_loggato", JSON.stringify(utente));

  return { successo: true, messaggio: "Login effettuato!" };
}

/**
 * Effettua il logout: rimuove la sessione e torna alla homepage.
 */
function logout() {
  sessionStorage.removeItem("fto_utente_loggato");
  window.location.href = "index.html";
}

/**
 * Controlla se c'è un utente loggato.
 * @returns {object|null} - L'utente loggato, oppure null
 */
function getUtenteLoggato() {
  const dati = sessionStorage.getItem("fto_utente_loggato");
  if (!dati) return null;
  return JSON.parse(dati);
}

/**
 * Ritorna la lista di tutti gli utenti registrati.
 * @returns {Array}
 */
function getUtenti() {
  const dati = localStorage.getItem("fto_utenti");
  if (!dati) return [];
  return JSON.parse(dati);
}

/**
 * Aggiorna la navbar in base allo stato di login.
 * Mostra il nome utente se loggato, nasconde/mostra i pulsanti.
 */
function aggiornaNabar() {
  const utente = getUtenteLoggato();

  const elNome    = document.getElementById("nav-username");
  const elLogin   = document.getElementById("nav-login");
  const elLogout  = document.getElementById("nav-logout");

  if (utente) {
    // Utente loggato: mostra nome e pulsante Esci
    if (elNome)   elNome.textContent  = "👤 " + utente.nome;
    if (elLogin)  elLogin.style.display  = "none";
    if (elLogout) elLogout.style.display = "inline-block";
  } else {
    // Non loggato: mostra solo Accedi
    if (elNome)   elNome.textContent  = "";
    if (elLogin)  elLogin.style.display  = "inline-block";
    if (elLogout) elLogout.style.display = "none";
  }
}

// Esegui aggiornamento navbar appena la pagina carica
document.addEventListener("DOMContentLoaded", aggiornaNabar);
