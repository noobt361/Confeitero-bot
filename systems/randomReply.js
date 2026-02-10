const { generateAdaptivePhrase } = require("./phraseGenerator");

const CHANCE = 0.09; // 100% de chance por mensagem

module.exports = async (message, client) => {
  if (message.author.bot) return;

  // não responde comandos
  if (message.content.startsWith(client.PREFIX)) return;

  // chance aleatória
  if (Math.random() > CHANCE) return;

  try {
    await message.reply({
      content: generateAdaptivePhrase(),
      allowedMentions: { repliedUser: false }
    });
  } catch (err) {
    console.error("Erro no randomReply:", err);
  }
};
