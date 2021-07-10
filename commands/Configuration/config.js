const { Client, Message, MessageEmbed } = require("discord.js");
const muteRoleSchema = require("../../models/mute");
const modlogsSchema = require("../../models/modlogs");
const { error, usage, userPerms, embed } = require("../../functions");
module.exports = {
  name: "config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return userPerms(message, {
        Perm: `Administrator`,
      });
    let choise = ["muteRole", "modlogs"];
    if (args[0] === "muteRole") {
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[1]);
      if (!role)
        return usage(message, {
          Usage: `config <muteRole | modlogs> <role | channel>`,
        });
      muteRoleSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) data.delete();
        new muteRoleSchema({
          Guild: message.guild.id,
          Role: role.id,
        }).save();
        embed(message, {
          Description: `> Successfully, ${role.toString()} is now the mute role`,
        });
      });
    } else if (args[0] === "modlogs") {
      const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[1]);
      if (!channel)
        return usage(message, {
          Usage: `config <muteRole | modlogs> <role | channel>`,
        });
      modlogsSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) data.delete();
        new modlogsSchema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        embed(message, {
          Description: `> Successfully, ${channel.toString()} is now the modlogs channel`,
        });
      });
    } else {
      usage(message, {
        Usage: `config <muteRole | modlogs> <role | channel>`,
      });
    }
  },
};
