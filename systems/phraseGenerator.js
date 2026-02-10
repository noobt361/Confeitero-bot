function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SUBJECTS = [
  "a batata",
  "o sistema",
  "meu cérebro",
  "esse bot",
  "o caos",
  "ninguém",
  "todo mundo",
  "o nada"
];

const VERBS = [
  "explodiu",
  "pensou",
  "comeu",
  "esqueceu",
  "gritou",
  "derreteu",
  "questionou",
  "ignorou"
];

const OBJECTS = [
  "a realidade",
  "um sapato molhado",
  "batata roxa",
  "o próprio destino",
  "nada em específico",
  "um erro de sintaxe",
  "o conceito de tempo"
];

const ADJECTIVES = [
  "confuso",
  "molhado",
  "existencial",
  "desnecessário",
  "suspeito",
  "errado",
  "proibido"
];

const EXTRAS = [
  "do nada",
  "sem motivo aparente",
  "em silêncio",
  "com convicção",
  "por motivos óbvios",
  "aparentemente",
  "talvez"
];

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

module.exports = function generatePhrase() {
  const roll = Math.random();

  if (roll < 0.25) return shortPhrase();
  if (roll < 0.55) return mediumPhrase();
  if (roll < 0.85) return longPhrase();
  return chaosPhrase();
};