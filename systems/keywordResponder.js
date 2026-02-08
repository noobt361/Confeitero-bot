// systems/keywordResponder.js

// Respostas fixas (sempre respondem)
const FIXED_RESPONSES = {
  "testei": "testado 😎",
  "eu, tu": "NOIS BOTA NELAS",
  "nossa": "veyyrr"
};

// Respostas aleatórias (resposta com chance)
const RANDOM_RESPONSES = {
  ";-;": ["chora não 🥺", "tá tudo bem 😢", "tranquilo, respira 😌"],
  ":>": [":D", "😎"]
};

const RANDOM_CHANCE = 0.7; // 70% de chance de responder

module.exports = async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Respostas fixas
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

  // Respostas aleatórias
  for (const keyword in RANDOM_RESPONSES) {
    if (content.includes(keyword)) {
      if (Math.random() > RANDOM_CHANCE) return;

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
