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
  name: "removewarn",
  aliases: ["rw"],
  description: "Removes a warn from a member",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return userPerms(message, {
        Perm: "Manage Messages",
      });
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return usage(message, {
        Usage: `removewarn <member>`,
      });
    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          let number = parseInt(args[1]) - 1;
          data.content.splice(number, 1);
          embed(message, {
            Description: `Deleted **${user.user.tag}**'s warn!`,
          });
          data.save();
        } else {
          error(message, {
            ErrorType: "404",
            Message: `This user don't have any warns`,
          });
        }
      }
    );
  },
};
