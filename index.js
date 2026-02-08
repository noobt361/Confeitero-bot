const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

//porcentagens
const RANDOM_REPLY_CHANCE = 0.05; // 5%
const RANDOM_REACTION_CHANCE = 0.1;




const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/* ===============================
   CONFIGURAÇÕES GERAIS
================================ */
const PREFIX = "=";

//Aleatorios

//Emojis
const RANDOM_EMOJIS = ["😂", "🍰", "❤️", "👀", "😈"];

//Frases 
const RANDOM_PHRASES = [
  "👀 interessante isso aí...",
  "hm… faz sentido 🤔",
  "não sei se concordo, mas ok 😈",
  "isso me parece suspeito",
  "anotado 📌",
  "🍰 alguém falou em bolo?"
];

/* ===============================
   SISTEMA DE COMANDOS
================================ */
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs
    .readdirSync(folderPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);

    client.commands.set(command.name, command);
  }
}

/* ===============================
   EVENTO DE MENSAGENS
================================ */
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  /* ---- RESPOSTA ALEATÓRIA ---- */
if (!message.content.startsWith(PREFIX)) {
  if (Math.random() < RANDOM_REPLY_CHANCE) {
    const phrase =
      RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)];

    try {
      await message.reply({
        content: phrase,
        allowedMentions: { repliedUser: false }
      });
    } catch (err) {
      console.error("Erro ao responder:", err);
    }
  }
}


  /* ---- INTERAÇÃO ALEATÓRIA ---- */
  if (!message.content.startsWith(PREFIX)) {
    if (Math.random() < RANDOM_REACTION_CHANCE) {
      const emoji =
        RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];

      try {
        await message.react(emoji);
      } catch (err) {
        console.error("Erro ao reagir:", err);
      }
    }
  }

  /* ---- COMANDOS ---- */
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  command.execute(message, args);
});

/* ===============================
   BOT ONLINE
================================ */
client.once("ready", () => {
  console.log("🤖 Bot online e organizado!");
});

client.login(process.env.DISCORD_TOKEN);
