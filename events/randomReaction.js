const CHANCE = 0.1;
const EMOJIS = ["😂", "🍰", "❤️", "👀", "😈"];

module.exports = async (message, client) => {
  if (message.content.startsWith(client.PREFIX)) return;
  if (Math.random() > CHANCE) return;

  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  try {
    await message.react(emoji);
  } catch {}
};
