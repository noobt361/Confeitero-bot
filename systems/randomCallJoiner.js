const { joinVoiceChannel } = require("@discordjs/voice");

const MIN_TIME = 0; // 0 segundos
const MAX_TIME = 2 * 60 * 1000; // 5 minutos

function randomDelay() {
  return Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1)) + MIN_TIME;
}

async function loop(client) {
  if (!client.randomCallActive) return;

  const delay = randomDelay();

  setTimeout(async () => {
    if (!client.randomCallActive) return;

    const guilds = client.guilds.cache.values();

    for (const guild of guilds) {
      const channels = guild.channels.cache.filter(
        c => c.isVoiceBased() && c.members.size > 0
      );

      if (!channels.size) continue;

      const channel = channels.random();

      joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
      });

      console.log(`Entrei call ${channel.name}`);
      break;
    }

    loop(client);
  }, delay);
}

module.exports = {
  start(client) {
    if (client.randomCallActive) return;
    client.randomCallActive = true;
    loop(client);
  },

  stop(client) {
    client.randomCallActive = false;
  }
};
