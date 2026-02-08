const CHANCE = 0.05;

const PHRASES = [
  "👀 interessante isso aí...",
  "hm… faz sentido 🤔",
  "isso me parece suspeito",
  "anotado 📌",
  "🍰 alguém falou em bolo?"
];

module.exports = async (message, client) => {
  if (message.content.startsWith(client.PREFIX)) return;
  if (Math.random() > CHANCE) return;

  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  try {
    await message.reply({
      content: phrase,
      allowedMentions: { repliedUser: false }
    });
  } catch {}
};
