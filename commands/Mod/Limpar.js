module.exports = {
  name: ["limpar", "limp",]
  execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("❌ Sem permissão.");
    }

    const quantidade = parseInt(args[0]);
    if (!quantidade) return message.reply("Digite um número.");

    message.channel.bulkDelete(quantidade);
  }
};
