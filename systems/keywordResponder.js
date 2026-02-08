// Respostas fixas:
const FIXED_RESPONSES = {
  "teste": "testado 😎",
  "EU, TU": "NOIS BOTA NELAS",
  ";-;": "chora não 🥺",
  ":>": ":D",
};

// Respostas aleatórias:
const RANDOM_RESPONSES = {
  ";-;": ["chora não 🥺", "tá tudo bem 😢", "tranquilo, respira 😌", "dorme que passa"],
  ":>": "😎",
  "Nossa": "veyyrr",
};

const RANDOM_CHANCE = 0.5; // 0.1 = 10%

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
