const generatePhrase = require("./phraseGenerator");

const CHANCE = 1; // 6% de chance por mensagem

module.exports = async (message, client) => {
  if (message.author.bot) return;

  // não responde comandos
  if (message.content.startsWith(client.PREFIX)) return;

  if (Math.random() > CHANCE) return;

  try {
    await message.reply({
      content: generatePhrase(),
      allowedMentions: { repliedUser: false }
    });
  } catch (err) {
    console.error("Erro no randomReply:", err);
  }
};
