module.exports = async (client, oldState, newState) => {
  const bot = newState.guild.members.me;
  if (!bot?.voice.channel) return;

  const channel = bot.voice.channel;

  // se só o bot estiver na call
  if (channel.members.size === 1) {
    setTimeout(() => {
      // confere de novo depois do tempo
      if (channel.members.size === 1) {
        bot.voice.disconnect();
        console.log("👋 Saí da call por solidão");
      }
    }, 15000); // 15 segundos sozinho
  }
};
