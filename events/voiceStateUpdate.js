const PHRASES = [
  "olha quem chegou 👀",
  "ih rapaz, mais um",
  "boa noite, criatura",
  "chegou atrasado em",
  "bem-vindo amiguin",
  "mais ummmmm",
  "aeeee, mais amiguin"
];

// 🔧 OPCIONAL: canal fixo (deixe null se não quiser)
const TEXT_CHANNEL_ID = 1445621984292507668;
// exemplo:
// const TEXT_CHANNEL_ID = "123456789012345678";

module.exports = {
  name: "voiceStateUpdate",

  async execute(client, oldState, newState) {
    // ignora bots
    if (newState.member?.user.bot) return;

    // só quando a pessoa ENTRA na call
    if (!newState.channel || oldState.channel) return;

    const voiceChannel = newState.channel;

    // bot precisa estar na mesma call
    if (!voiceChannel.members.has(client.user.id)) return;

    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];

    // 🔍 escolhe canal de texto
    let textChannel = null;

    // 1️⃣ canal fixo
    if (TEXT_CHANNEL_ID) {
      textChannel = newState.guild.channels.cache.get(TEXT_CHANNEL_ID);
    }

    // 2️⃣ system channel
    if (!textChannel) {
      textChannel = newState.guild.systemChannel;
    }

    // 3️⃣ qualquer canal de texto válido
    if (!textChannel) {
      textChannel = newState.guild.channels.cache.find(
        c =>
          c.isTextBased() &&
          c.permissionsFor(client.user)?.has("SendMessages")
      );
    }

    if (!textChannel) return;

    try {
      await textChannel.send(
        `🎧 **${newState.member.user.username}** ${phrase}`
      );
    } catch (err) {
      console.error("Erro ao enviar mensagem de entrada na call:", err);
    }
  }
};
