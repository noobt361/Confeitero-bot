const randomReaction = require("../systems/randomReaction");
const randomReply = require("../systems/randomReply");
const mentionWatcher = require("../systems/mentionWatcher");
const keywordResponder = require("../systems/keywordResponder");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    // ---------- SISTEMAS PASSIVOS ----------
    try { randomReaction(message); } catch(err){ console.error(err); }
    try { randomReply(message, client); } catch(err){ console.error(err); }
    try { mentionWatcher(message, client); } catch(err){ console.error(err); }
    try { keywordResponder(message); } catch(err){ console.error(err); }

    // ---------- COMANDOS PREFIXADOS ----------
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
