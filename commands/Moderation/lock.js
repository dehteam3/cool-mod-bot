const { embed, userPerms, error } = require("../../functions");
const { Message, Client } = require("discord.js");

module.exports = {
	name: "lock",
	/**
	 * @param {Message} message
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_GUILD"))
			return userPerms(message, {
				Perm: "Manage Server"
			});
		message.channel.overwritePermissions(
			[
				{
					id: message.guild.id,
					deny: ["SEND_MESSAGES"]
				}
			]
		);
		embed(message, {
			Description: `> Successfully, Locked ${message.channel.toString()}`
		})
	}
}