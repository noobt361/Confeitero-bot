const randomReaction = require("../systems/randomReaction");
const randomReply = require("../systems/randomReply");
const mentionWatcher = require("../systems/mentionWatcher");
const keywordResponder = require("../systems/keywordResponder");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    // 👉 COMANDOS PRIMEIRO
    if (message.content.startsWith(client.PREFIX)) {
      const args = message.content
        .slice(client.PREFIX.length)
        .trim()
        .split(/ +/);

      const commandName = args.shift()?.toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return;

      return command.execute(message, args);
    }

    // 👉 SISTEMAS PASSIVOS DEPOIS
    randomReaction(message, client);
    randomReply(message, client);
    mentionWatcher(message, client);
    keywordResponder(message);
  }
};
