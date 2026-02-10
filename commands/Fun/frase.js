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

    switch ((args[0] || "").toLowerCase()) {
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
        if (args[1]?.toLowerCase() === "xinga") {
          phrase = generateInsult();
          break;
        }

      default:
        phrase = generateAdaptivePhrase();
    }

    try {
      await message.reply({
        content: phrase,
        allowedMentions: { repliedUser: false }
      });
    } catch (err) {
      console.error("Erro no comando frase:", err);
    }
  }
};
