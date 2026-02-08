const TIME = 12000; //1000 ms = 1 seg

const PHRASES = [
  "acho que a notificação não chegou...",
  "chamaram você aí",
  "estamos aguardando uma resposta",
  "alô?",
  "Ta vivo?",
  "Alooooooo, alguem?!?!?!",
  "tá ocupadx eu acho...",
  "ta ai doidx?",
  "ACORDA BAIANO",
  "Assim complica patrão, elx num chega",
  "Ou ce aparece... ou aparece",
];

module.exports = (message, client) => {
  // remove pendência se o user respondeu
  for (const [key, data] of client.pendingMentions.entries()) {
    if (
      data.userId === message.author.id &&
      data.channelId === message.channel.id
    ) {
      client.pendingMentions.delete(key);
    }
  }

  if (message.mentions.users.size === 0) return;

  message.mentions.users.forEach(user => {
    if (user.bot) return;

    const key = `${message.channel.id}-${user.id}`;
    client.pendingMentions.set(key, {
      userId: user.id,
      channelId: message.channel.id
    });

    setTimeout(async () => {
      if (!client.pendingMentions.has(key)) return;

      const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      try {
        await message.channel.send(`<@${user.id}> ${phrase}`);
      } catch {}

      client.pendingMentions.delete(key);
    }, TIME);
  });
};
