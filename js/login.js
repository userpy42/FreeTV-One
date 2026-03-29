/* =============================================
   login.js — Logica della pagina di accesso
   Gestisce login, registrazione e tabs
   ============================================= */

/**
 * Mostra il tab selezionato (login o register).
 * @param {string} tab - 'login' oppure 'register'
 */
function showTab(tab) {
  // Form
  document.getElementById("form-login").style.display    = tab === "login"    ? "block" : "none";
  document.getElementById("form-register").style.display = tab === "register" ? "block" : "none";

  // Stile tab attivo
  document.getElementById("tab-login").classList.toggle("active",    tab === "login");
  document.getElementById("tab-register").classList.toggle("active", tab === "register");

  // Pulisce i messaggi
  nascondiMessaggio();
}

/**
 * Esegue il login leggendo i campi del form.
 */
function login() {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // Validazione campi
  if (!email || !password) {
    mostraMessaggio("Inserisci email e password.", "errore");
    return;
  }

  // Chiama la funzione di auth.js
  const risultato = loginUtente(email, password);

  if (risultato.successo) {
    mostraMessaggio(risultato.messaggio, "successo");
    // Reindirizza alla homepage dopo mezzo secondo
    setTimeout(() => { window.location.href = "index.html"; }, 600);
  } else {
    mostraMessaggio(risultato.messaggio, "errore");
  }
}

/**
 * Esegue la registrazione leggendo i campi del form.
 */
function register() {
  const nome      = document.getElementById("reg-name").value.trim();
  const email     = document.getElementById("reg-email").value.trim();
  const password  = document.getElementById("reg-password").value;
  const password2 = document.getElementById("reg-password2").value;

  // Validazione campi
  if (!nome || !email || !password || !password2) {
    mostraMessaggio("Compila tutti i campi.", "errore");
    return;
  }

  // Le due password devono coincidere
  if (password !== password2) {
    mostraMessaggio("Le password non coincidono.", "errore");
    return;
  }

  // Password minimo 4 caratteri
  if (password.length < 4) {
    mostraMessaggio("La password deve avere almeno 4 caratteri.", "errore");
    return;
  }

  // Chiama la funzione di auth.js
  const risultato = registraUtente(nome, email, password);

  if (risultato.successo) {
    mostraMessaggio(risultato.messaggio + " Ora puoi accedere.", "successo");
    // Passa automaticamente al tab login dopo 1 secondo
    setTimeout(() => { showTab("login"); }, 1000);
  } else {
    mostraMessaggio(risultato.messaggio, "errore");
  }
}

/**
 * Mostra un messaggio nella pagina.
 * @param {string} testo - Il testo da mostrare
 * @param {string} tipo  - 'errore' o 'successo'
 */
function mostraMessaggio(testo, tipo) {
  const el = document.getElementById("auth-message");
  el.textContent = testo;
  el.className = "auth-message " + tipo;
}

/**
 * Nasconde il messaggio.
 */
function nascondiMessaggio() {
  const el = document.getElementById("auth-message");
  el.textContent = "";
  el.className = "auth-message";
}

// Se l'utente è già loggato, reindirizza alla homepage
document.addEventListener("DOMContentLoaded", function () {
  if (getUtenteLoggato()) {
    window.location.href = "index.html";
  }
});
