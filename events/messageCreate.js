const randomReaction = require("../systems/randomReaction");
const randomReply = require("../systems/randomReply");
const mentionWatcher = require("../systems/mentionWatcher");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    // sistemas passivos
    randomReaction(message, client);
    randomReply(message, client);
    mentionWatcher(message, client);

    // comandos
    if (!message.content.startsWith(client.PREFIX)) return;

    const args = message.content
      .slice(client.PREFIX.length)
      .trim()
      .split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    command.execute(message, args);
  }
};
