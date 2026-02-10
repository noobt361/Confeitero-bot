// Guarda timers por guild
const leaveTimers = new Map();

module.exports = async (client) => {
  const guilds = client.guilds.cache.values();

  for (const guild of guilds) {
    const botMember = guild.members.me;
    if (!botMember?.voice.channel) continue;

    const channel = botMember.voice.channel;

    // Se tem mais de 1 pessoa, cancela qualquer timer
    if (channel.members.size > 1) {
      if (leaveTimers.has(guild.id)) {
        clearTimeout(leaveTimers.get(guild.id));
        leaveTimers.delete(guild.id);
      }
      continue;
    }

    // Já existe timer? Não cria outro
    if (leaveTimers.has(guild.id)) continue;

    // Cria timer
    const timer = setTimeout(() => {
      const stillThere = guild.members.me?.voice.channel;

      if (stillThere && stillThere.members.size === 1) {
        stillThere.leave();
        console.log("👋 Saí da call por solidão");
      }

      leaveTimers.delete(guild.id);
    }, 15000); // 15 segundos

    leaveTimers.set(guild.id, timer);
  }
};
