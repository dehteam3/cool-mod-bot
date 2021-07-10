const { MessageEmbed, Message, Client, GuildMember } = require("discord.js");
const { error, usage, embed, userPerms, clientRoles } = require("../../functions");

module.exports = {
	name: "nickname",
	aliases: ["nick"],
	/**
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_NICKNAMES")) return userPerms(message, {
			Perm: "Manage Nicknames"
		});
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return usage(message, {
			Usage: "nickname <member> <nickname>"
		});
		/**
		 * @param {GuildMember} member
		 */
		const nick = args.slice(1).join(" ");
		if (!nick) return usage(message, {
			Usage: "nickname <member> <nickname>"
		});
		const clientUserGuild = message.guild.members.cache.get(client.user.id);
		if (clientUserGuild.roles.highest.position < member.roles.highest.position) return clientRoles(message);
		try {
			member.setNickname(nick);
			embed(message, {
				Description: `Changed ${member.toString()}'s nickname to **${nick}**`
			})
		} catch (e) {
			console.log(e);
			error(message, {
				ErrorType: "Something went wrong",
				Message: `I couldn't change ${member.toString()}'s nickname`
			})
		}
	}
}