/* =============================================
   movies.js — Catalogo dei film disponibili
   8 film demo con metadati e riferimento video
   ============================================= */

/**
 * Array con i dati dei film del catalogo.
 * Ogni film ha:
 *   id        — identificatore unico
 *   titolo    — nome del film
 *   anno      — anno di uscita
 *   genere    — genere cinematografico
 *   durata    — durata in minuti
 *   desc      — descrizione breve della trama
 *   emoji     — emoji usata come copertina placeholder
 *   video     — percorso del file video nella cartella /videos/
 */
const CATALOGO_FILM = [
  {
    id: 1,
    titolo: "L'Avventura Perduta",
    anno: 2022,
    genere: "Avventura",
    durata: 95,
    desc: "Un gruppo di esploratori si addentra in una foresta misteriosa alla ricerca di un antico tempio. Tra trappole e tradimenti, solo la fiducia reciproca potrà salvarli.",
    emoji: "🗺️",
    video: "videos/film1.mp4"
  },
  {
    id: 2,
    titolo: "Codice Zero",
    anno: 2023,
    genere: "Fantascienza",
    durata: 110,
    desc: "Nel 2075, un'intelligenza artificiale ribelle prende il controllo di una stazione spaziale. Un'unica hacker può fermarla prima che sia troppo tardi.",
    emoji: "🤖",
    video: "videos/film2.mp4"
  },
  {
    id: 3,
    titolo: "Il Segreto del Mare",
    anno: 2021,
    genere: "Mistero",
    durata: 88,
    desc: "Una giovane biologa marina scopre segnali radio sottomarini di origine sconosciuta. Le indagini la porteranno in un viaggio che cambierà per sempre la sua visione del mondo.",
    emoji: "🌊",
    video: "videos/film3.mp4"
  },
  {
    id: 4,
    titolo: "Fuoco e Ghiaccio",
    anno: 2020,
    genere: "Azione",
    durata: 102,
    desc: "Due agenti rivali — uno specialista in esplosivi, l'altra in operazioni artiche — devono collaborare per sventare un attacco terroristico su una diga himalayana.",
    emoji: "🔥",
    video: "videos/film4.mp4"
  },
  {
    id: 5,
    titolo: "La Notte dei Sogni",
    anno: 2022,
    genere: "Drammatico",
    durata: 78,
    desc: "Una pianista perde la memoria dopo un incidente. Attraverso le note della sua musica, ricostruisce pezzo per pezzo il puzzle della sua vita passata.",
    emoji: "🎹",
    video: "videos/film5.mp4"
  },
  {
    id: 6,
    titolo: "Ombre sul Castello",
    anno: 2019,
    genere: "Horror",
    durata: 91,
    desc: "Una famiglia si trasferisce in un antico castello toscano. Ben presto capiscono che non sono soli: le ombre sul muro nascondono un segreto vecchio di secoli.",
    emoji: "🏰",
    video: "videos/film6.mp4"
  },
  {
    id: 7,
    titolo: "Cuori in Corsa",
    anno: 2023,
    genere: "Commedia",
    durata: 84,
    desc: "Due competitors acerrimici nella stessa gara di kart si ritrovano a fare squadra per battere un campione imbattibile. Tra risate e sgommate nasce qualcosa di inaspettato.",
    emoji: "🏎️",
    video: "videos/film7.mp4"
  },
  {
    id: 8,
    titolo: "La Mappa del Tempo",
    anno: 2021,
    genere: "Fantasy",
    durata: 115,
    desc: "Un giovane studioso trova una mappa che permette di aprire portali verso epoche diverse. Il suo viaggio lo porta dall'antico Egitto al futuro post-apocalittico.",
    emoji: "⏳",
    video: "videos/film8.mp4"
  }
];

/**
 * Trova un film per ID.
 * @param {number} id - L'id del film
 * @returns {object|null}
 */
function getFilmById(id) {
  return CATALOGO_FILM.find(f => f.id === parseInt(id)) || null;
}
