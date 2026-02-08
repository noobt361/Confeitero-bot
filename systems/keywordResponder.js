// systems/keywordResponder.js

// Respostas fixas: sempre respondem quando a palavra aparece
const FIXED_RESPONSES = {
  "testei": "testado 😎",
  "ola": "Oi oi 👋",
  "EU, TU": "NOIS BOTA NELAS",

};

// Respostas aleatórias: só respondem com uma chance
const RANDOM_RESPONSES = {
  ";-;": ["chora não 🥺", "tá tudo bem 😢", "tranquilo, respira 😌", "dorme que passa 😴"],
  ":>": [":D", "😎"],
  "Nossa": "veyyrr",
  "aff": "meo",
  "T-T": ".,."
};

const RANDOM_CHANCE = 0.09; // 0.1 = 10%

module.exports = async (message) => {
  if (message.author.bot) return; // ignora bots

  const content = message.content.toLowerCase();

  // 1️⃣ Respostas fixas
  for (const keyword in FIXED_RESPONSES) {
    if (content.includes(keyword)) {
      try {
        await message.reply(FIXED_RESPONSES[keyword]);
      } catch (err) {
        console.error("Erro ao responder palavra-chave fixa:", err);
      }
      return; // sai após responder fixo
    }
  }

  // 2️⃣ Respostas aleatórias
  for (const keyword in RANDOM_RESPONSES) {
    if (content.includes(keyword)) {
      if (Math.random() > RANDOM_CHANCE) return; // não dispara

      const possibleReplies = RANDOM_RESPONSES[keyword];
      const reply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];

      try {
        await message.reply(reply);
      } catch (err) {
        console.error("Erro ao responder palavra-chave aleatória:", err);
      }
      return; // só responde uma vez
    }
  }
};
