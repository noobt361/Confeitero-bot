const {
  generateAdaptivePhrase,
  generateChaos,
  generateShort,
  generateLong,
  generateLore,
  generatePhilosophy,
  generateInsult
} = require("../../systems/phraseGenerator");


module.exports = {
  name: "frase",
  description: "Gera frases caóticas do confeiteiro 🍰",

  async execute(message, args) {
    let phrase;

    const sub = (args[0] || "").toLowerCase();

    switch (sub) {
      case "caos":
        phrase = generateChaos();
        break;

      case "curta":
        phrase = generateShort();
        break;

      case "longa":
        phrase = generateLong();
        break;

      case "lore":
        phrase = generateLore();
        break;

      case "filosofia":
        phrase = generatePhilosophy();
        break;
      case "me":
      if (args[1] && args[1].toLowerCase() === "xinga") {
      phrase = generateInsult();
      } else {
      phrase = generateAdaptivePhrase();
      }
      break;

      default:
        phrase = generateAdaptivePhrase();
    }

    await message.reply({
      content: phrase,
      allowedMentions: { repliedUser: false }
    });
  }
};
