const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.pendingMentions = new Map(); // usado pelo mentionWatcher

const PREFIX = "=";
client.PREFIX = PREFIX;

/* ===============================
   COMANDOS
================================ */
const commandsPath = path.join(__dirname, "commands");
for (const folder of fs.readdirSync(commandsPath)) {
  const folderPath = path.join(commandsPath, folder);
  for (const file of fs.readdirSync(folderPath).filter(f => f.endsWith(".js"))) {
    const command = require(path.join(folderPath, file));
    client.commands.set(command.name, command);
  }
}

/* ===============================
   EVENTOS
================================ */
const eventsPath = path.join(__dirname, "events");
for (const file of fs.readdirSync(eventsPath)) {
  const event = require(path.join(eventsPath, file));
  client.on(event.name, (...args) => event.execute(client, ...args));
}

/* ===============================
   ONLINE
================================ */
client.once("ready", () => {
  console.log("🤖 Bot online e organizado!");
});

client.login(process.env.DISCORD_TOKEN);