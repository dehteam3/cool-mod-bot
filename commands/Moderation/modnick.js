const {
	Message,
	MessageEmbed,
	Client,
	GuildMember
} = require("discord.js");
const {error, embed, userPerms, clientPerms, clientRoles, usage} = require("../../functions");

module.exports = {
	name: "modnick",
	/**
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_NICKNAMES"))
			return userPerms(
				message,
				{
					Perm: "Manage Nicknames"
				}
			);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return usage(message, {
			Usage: "modnick <member>"
		});
		const sum = Math.floor(Math.random() * 1000) + 1;
		const nick = `Moderated Nickname ${sum}`;
		member.setNickname(nick, "Moderated Nickname")
		embed(
			message,
			{
				Description: `Moderated Nickname ${member.toString()}`
			}
		)
	}
}