const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/welcome");
const { error, usage, userPerms, embed } = require("../../functions");
module.exports = {
  name: "welcomeconfig",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
    	return userPerms(message, {
	    Perm: "Administrator"
    })
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) return usage(message, {
	    Usage: "welcomeconfig <channel> <role>"
    });
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!role) return usage(message, {
	    Usage: "welcomeconfig <channel> <role>"
    });
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
	    if (data) data.delete();
	    new schema({
		    Guild: message.guild.id,
		    Channel: channel.id,
		    Role: role.id
	    }).save();
	    embed(message, {
		    Description: `> Successfully, ${channel.toString()} is now the welcome channel and ${role.toString()} is now the auto role`
	    });
    })
  },
};
