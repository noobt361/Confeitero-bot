module.exports = {
  name: "kickass, kick",
  description: "Expulsa um usuário específico do servidor, respeitando permissões e cargos",
  async execute(message, args) {
    // IDs de usuários autorizados
    const ALLOWED_USERS = ["123456789012345678", "987654321098765432"];
    const isUserAllowed = ALLOWED_USERS.includes(message.author.id);

    // IDs dos cargos autorizados
    const ALLOWED_ROLES = ["11445611484083126403"];
    const hasRoleAllowed = message.member.roles.cache.some(role =>
      ALLOWED_ROLES.includes(role.id)
    );

    if (!isUserAllowed && !hasRoleAllowed) {
      return message.reply("❌ fraco... lhe falta fermento");
    }

    // Pega o usuário a ser kickado
    const target = message.mentions.members.first();
    if (!target) {
      return message.reply("❌ eu sou vidente não -,-");
    }

    // Evita expulsar alguém com cargo igual ou maior
    if (target.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply("❌ pode isso não men");
    }

    // Evita expulsar administradores
    if (target.permissions.has("Administrator")) {
      return message.reply("❌ esta crazy man?");
    }

    try {
      await target.kick(`Expulso por ${message.author.tag}`);
      message.channel.send(`✅ ${target.user.tag} bunda chutada com sucesso 😁`);
    } catch (err) {
      console.error("Erro ao expulsar usuário:", err);
      message.reply("❌ deu trem errado aqui o,arruma eu 😖");
    }
  }
};
