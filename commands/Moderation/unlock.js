const { embed, userPerms, error } = require("../../functions");
const { Message, Client } = require("discord.js");

module.exports = {
	name: "unlock",
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
					allow: ["SEND_MESSAGES"]
				}
			]
		);
		embed(message, {
			Description: `> Successfully, Unlocked ${message.channel.toString()}`
		})
	}
}