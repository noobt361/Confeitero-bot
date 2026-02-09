const randomCallJoiner = require("../../systems/randomCallJoiner");

module.exports = {
  name: "call",

  execute(message, args) {
    if (!args[0]) {
      return message.reply("usa `=call on` ou `=call off`");
    }

    if (args[0] === "on") {
      randomCallJoiner.start(message.client);
      return message.reply("Call?? agora?");
    }

    if (args[0] === "off") {
      randomCallJoiner.stop(message.client);
      return message.reply("fui durmi, flw pessoas");
    }
  }
};
