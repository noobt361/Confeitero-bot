// systems/keywordResponder.js

// Respostas fixas: sempre respondem quando a palavra aparece
const FIXED_RESPONSES = {
  "testei": "testado 😎",
  "ola": "Oi oi 👋",
  "complicado": "there is fuck",
  "confeitero": "não sei oque e porque ainda não sei ler... mais acho que pode não",
  "feiticeira": "faz feitiço",
  "gif": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHJ3OHNsOHR3d2FxaTFvNTF6YjR0cmFtdmdwOGxkZ2R3NW5zdGZ1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LKFzjcZmI42iMpdjVS/giphy.gif"
};

// Respostas aleatórias: só respondem com uma chance
const RANDOM_RESPONSES = {
  ";-;": ["chora não 🥺", "tá tudo bem 😢", "tranquilo, respira 😌", "dorme que passa 😴"],
  ":>": [":D", "😎"],
  "nossa": ["veyyrr"],
  "aff": ["meo"],
};

const RANDOM_CHANCE = 0.4; // 0.1 = 10%

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
