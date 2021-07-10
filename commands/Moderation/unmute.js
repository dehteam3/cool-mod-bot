const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const { error, userPerms, usage, embed } = require("../../functions");
module.exports = {
  name: "unmute",
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return userPerms(message, {
        Perm: `Manage Roles`,
      });
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return usage(message, {
        Usage: `unmute <user>`,
      });
    const schema = require("../../models/mute");
    const data = await schema.findOne({ Guild: message.guild.id });
    if (!data)
      return error(message, {
        ErrorType: `404`,
        Message: `I couldn't find the mute role`,
      });
    const role = message.guild.roles.cache.get(data.Role);
    await member.roles.remove(role);
    embed(message, {
      Description: `**${member.user.tag}** is now unmuted`,
    });
  },
};
