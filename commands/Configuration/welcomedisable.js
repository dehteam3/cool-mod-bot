const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../models/welcome");
const { error, usage, userPerms, embed } = require("../../functions");
module.exports = {
	name: "welcomedisable",
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return userPerms(message, {
				Perm: "Administrator"
			});
		config.findOne({
			Guild: message.guild.id
		}, async (err, data) => {
			if (!data) return error(message, {
				ErrorType: "404",
				Message: "The **Welcome System** is not enabled"
			})
			data.delete();
			embed(message, {
				Description: `> Successfully, Disabled the welcome system`
			})
		})
	},
};
