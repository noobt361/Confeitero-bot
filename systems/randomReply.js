const CHANCE = 0.07; //0.01 = 1%

const PHRASES = [
  "👀 interessante isso aí...",
  "hm… faz sentido? 🤔",
  "isso me parece sus...",
  "anotado 📌",
  "complicado isso ai viu?",
  "uhum... sei",
  "tenho minhas duvida",
  "Gosto de azul :D",
  "Verdade isso ai... mais sabia que a Pale Light Very Light Bright Olive Green e muito feia?",
  "propoia...",
  "elx ta certx, confia",
  "nem te conto",
  "a vingança e um prato que se come fei",
  "pode isso não, e crime",
  "muito importante estudar",
  "tirin tin tin, a oferta vai caindo dentro da calcinha",
  "ainnn",
  "porca, relaxada, xexecuda",
  "estamos passando por uma cen-",
  "сукины сыны"
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
