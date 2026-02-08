const randomReaction = require("../systems/randomReaction");
const randomReply = require("../systems/randomReply");
const mentionWatcher = require("../systems/mentionWatcher");
const keywordResponder = require("../systems/keywordResponder");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    client.on("messageCreate", async (message) => {

    // sistemas passivos
    randomReaction(message, client);
    randomReply(message, client);
    mentionWatcher(message, client);
    keywordResponder(message);

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
