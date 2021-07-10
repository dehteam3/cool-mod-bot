const { MessageEmbed, Message, Client } = require("discord.js");
const { error, usage, embed } = require("../../functions");
const db = require("../../models/warning");

module.exports = {
  name: "warnings",
  aliases: ["warns"],
  description: `Displays all the warns for a member`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          embed(message, {
            Description: data.content.map(
              (w, i) =>
                `\`${i + 1}\` | Moderator : ${
                  message.guild.members.cache.get(w.moderator).user.tag
                }\nReason : ${w.reason}`
            ),
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
