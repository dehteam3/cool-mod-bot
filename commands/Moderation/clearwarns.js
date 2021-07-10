const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const prefix = require("../../config.json").prefix;
const {
  embed,
  userPerms,
  usage,
  clientPerms,
  clientRoles,
  error,
} = require("../../functions");
const db = require("../../models/warning");

module.exports = {
  name: "clearwarns",
  aliases: ["cws"],
  description: "Clears all the warns from a member",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return userPerms(message, {
        Perm: `Manage Messages`,
      });
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return usage(message, {
        Usage: `clearwarns <member>`,
      });
    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          await db.findOneAndDelete({
            user: user.user.id,
            guildid: message.guild.id,
          });
          embed(message, {
            Description: `Cleared **${user.user.tag}**'s warns`,
          });
        } else {
          error(message, {
            ErrorType: "404",
            Message: `**${user.user.tag}** doesn't have any warns`,
          });
        }
      }
    );
  },
};
