const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");

const PHRASES = [
  "olha quem chegou 👀",
  "ih rapaz, mais um",
  "boa noite, criatura",
  "chegou atrasado em",
  "bem-vindo amiguin",
  "mais ummmmm",
  "aeeee, mais amiguin"
];

module.exports = {
  name: "voiceStateUpdate",

  async execute(client, oldState, newState) {
    if (!newState.channel || oldState.channel) return;

    const channel = newState.channel;

    // bot precisa estar na mesma call
    const botInChannel = channel.members.has(client.user.id);
    if (!botInChannel) return;

    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];

    channel.guild.systemChannel?.send(
      `🎧 **${newState.member.user.username}** ${phrase}`
    );
  }
};
