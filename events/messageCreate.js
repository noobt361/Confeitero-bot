const randomReaction = require("../systems/randomReaction");
const randomReply = require("../systems/randomReply");
const mentionWatcher = require("../systems/mentionWatcher");
const keywordResponder = require("../systems/keywordResponder");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return; // ignora bots

    // ===============================
    // SISTEMAS PASSIVOS
    // ===============================
    // Para todos os sistemas, passamos a message e o client se necessário
    randomReaction(message); // reações aleatórias
    randomReply(message, client); // respostas aleatórias
    mentionWatcher(message, client); // respostas a menções
    keywordResponder(message); // respostas fixas ou aleatórias por palavra-chave

    // ===============================
    // COMANDOS EXPLICÍTEOS (prefixados)
    // ===============================
    if (!client.PREFIX) client.PREFIX = "="; // define prefixo padrão caso não exista
    if (!message.content.startsWith(client.PREFIX)) return;

    const args = message.content
      .slice(client.PREFIX.length)
      .trim()
      .split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      console.error(`Erro ao executar comando ${commandName}:`, err);
      message.reply("❌ Ocorreu um erro ao executar este comando.");
    }
  }
};
