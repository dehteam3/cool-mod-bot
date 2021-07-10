const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const prefix = require("../../config.json").prefix;
const {
  embed,
  userPerms,
  usage,
  clientPerms,
  clientRoles,
  modlogs
} = require("../../functions");
module.exports = {
  name: "kick",
  aliases: ["k"],
  description: "Kicks a member from a guild",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return userPerms(message, {
        Perm: "Kick Members",
      });
    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return clientPerms(message, {
        Perm: `Kick Members`,
      });
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return usage(message, {
        Usage: `kick <member> [reason]`,
      });
    const clientMember = message.guild.members.cache.get(client.user.id);
    if (
      clientMember.roles.highest.position <
        message.member.roles.highest.position ||
      member.user.id === message.guild.owner.user.id ||
      args[0] === message.guild.owner.user.id
    )
      return clientRoles(message);
    const reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Provided";
    if (!member.kickable) return clientRoles;

    member.kick(reason);
    embed(message, {
      Description: `Kicked **${member.user.tag}** for **${reason}**`,
    });
    modlogs({
	      Member: member,
	      Moderator: message.member,
	      Action: "Kick",
	      Color: "#FFFF00",
	      Reason: reason
      }, message);
  },
};
