/* ===============================
   DADOS BASE
================================ */

const SUBJECTS = ["a batata", "o confeiteiro", "meu cérebro", "ninguém", "o palhaço cansado", "a entidade do corredor", "meu eu alternativo", "o pensamento intrusivo", "a voz na parede", "o reflexo atrasado", "o demônio burocrata", "a consciência coletiva", "aquele ser que observa", "ninguém que importa"];
const VERBS = ["comeu", "quebrou", "esqueceu", "invocou", "cancelou", "ri nervosamente de", "sussurra para", "julga em silêncio", "invoca sem querer", "questiona demais", "ignora completamente", "desmonta psicologicamente", "encara por tempo demais", "aceita com resignação", "provoca o inevitável"];
const OBJECTS = ["o tempo", "a lógica", "o pão", "a realidade", "o manual proibido", "a lâmpada piscando", "um contrato sem letras", "o espelho rachado", "essa ideia péssima", "o último aviso", "um grito engarrafado", "a verdade inconveniente", "o botão vermelho", "o vazio confortável"];
const ADJECTIVES = ["estranho", "inútil", "perigoso", "místico", "claramente amaldiçoado", "estranhamente engraçado", "filosoficamente errado", "emocionalmente instável", "desnecessariamente profundo", "absurdamente real", "levemente possuído",  "cosmicamente irrelevante", "psicologicamente questionável", "perfeitamente perturbador"];
const EXTRAS = ["sem querer", "por acidente", "em silêncio", "de madrugada", "às 3 da manhã", "sem nenhuma explicação", "como se isso fosse normal", "por motivos que ninguém entende", "enquanto tudo observa", "no fundo da mente", "numa realidade paralela mal financiada", "segundo vozes imaginárias", "apesar do bom senso", "e isso muda tudo"];

/* ===============================
   FUNÇÕES AUXILIARES
================================ */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

/* ===============================
   FRASES
================================ */

function shortPhrase() {
  return `${pick(OBJECTS)} ${pick(ADJECTIVES)}`;
}

function mediumPhrase() {
  return `${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)}`;
}

function longPhrase() {
  return `${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)} ${pick(EXTRAS)}, o que é ${pick(ADJECTIVES)}.`;
}

function chaosPhrase() {
  return `${pick(ADJECTIVES)} ${pick(OBJECTS)} ${pick(VERBS)} ${pick(EXTRAS)}`;
}

function selfAware() {
  return `eu ${pick(VERBS)} ${pick(OBJECTS)} e não sei por quê`;
}

function tiredBot() {
  return `cansei de ${pick(VERBS)} ${pick(OBJECTS)}`;
}

function judgmentalBot() {
  return `isso é muito ${pick(ADJECTIVES)} pra um ${pick(OBJECTS)}`;
}

function pureChaos() {
  return `${pick(ADJECTIVES)} ${pick(ADJECTIVES)} ${pick(OBJECTS)}`;
}

function glitchPhrase() {
  return `${pick(OBJECTS)} ${pick(OBJECTS)} ${pick(VERBS)} ${pick(VERBS)}`;
}

function brainCrash() {
  return `${pick(EXTRAS)} ${pick(OBJECTS)} ${pick(ADJECTIVES)} ???`;
}

function lorePhrase() {
  return `${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)} porque ${pick(EXTRAS)}.`;
}

function philosopherPhrase() {
  return `${pick(OBJECTS)} é ${pick(ADJECTIVES)}, logo ${pick(SUBJECTS)} ${pick(VERBS)}.`;
}

function explanationPhrase() {
  return `isso acontece quando ${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)} sem ${pick(EXTRAS)}.`;
}

function questionPhrase() {
  return `${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)}?`;
}

function dramaticPhrase() {
  return `${pick(SUBJECTS)} ${pick(VERBS)} ${pick(OBJECTS)}...`;
}

function excusePhrase() {
  return `foi ${pick(OBJECTS)} que ${pick(VERBS)} ${pick(OBJECTS)}`;
}

function weirdCombo() {
  return `${pick(OBJECTS)} de ${pick(OBJECTS)}`;
}

function adjectiveObject() {
  return `${pick(ADJECTIVES)} ${pick(OBJECTS)}`;
}

function objectVerb() {
  return `${pick(OBJECTS)} ${pick(VERBS)}`;
}

function oneWordChaos() {
  return pick(OBJECTS);
}

function adjectiveOnly() {
  return pick(ADJECTIVES);
}

function verbOnly() {
  return pick(VERBS);
}

/* ===============================
   SELETOR DE FRASE (NÍVEL 3)
================================ */

function generatePhrase() {
  const roll = Math.random();

  if (roll < 0.15) return shortPhrase();
  if (roll < 0.30) return mediumPhrase();
  if (roll < 0.45) return longPhrase();
  if (roll < 0.55) return selfAware();
  if (roll < 0.65) return tiredBot();
  if (roll < 0.73) return judgmentalBot();
  if (roll < 0.80) return philosopherPhrase();
  if (roll < 0.86) return lorePhrase();
  if (roll < 0.91) return dramaticPhrase();
  if (roll < 0.95) return glitchPhrase();
  return pureChaos();
}

/* ===============================
   ANTI-REPETIÇÃO (NÍVEL 3)
================================ */

const PHRASE_HISTORY_LIMIT = 20;
const phraseHistory = [];

function generateUniquePhrase() {
  let phrase;
  let attempts = 0;

  do {
    phrase = generatePhrase();
    attempts++;
  } while (
    phraseHistory.some(p => normalize(p) === normalize(phrase)) &&
    attempts < 30
  );

  phraseHistory.push(phrase);
  if (phraseHistory.length > PHRASE_HISTORY_LIMIT) {
    phraseHistory.shift();
  }

  return phrase;
}

/* ===============================
   BÔNUS — BOT SE ADAPTA
================================ */

let repetitionCount = 0;

function generateAdaptivePhrase() {
  const phrase = generateUniquePhrase();

  if (phraseHistory.includes(phrase)) {
    repetitionCount++;
  } else {
    repetitionCount = 0;
  }

  if (repetitionCount >= 3) {
    return chaosPhrase();
  }

  return phrase;
}

/* ===============================
   EXPORTS
================================ */

module.exports = {
  generatePhrase,
  generateUniquePhrase,
  generateAdaptivePhrase
};
