const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const prefix = require("../../config.json").prefix;
const {
	embed,
	userPerms,
	usage,
	clientPerms,
	clientRoles,
	modlogs,
	userRoles
} = require("../../functions");
module.exports = {
	name: "ban",
	aliases: ["b"],
	description: "Bans a member from a guild",
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.permissions.has("BAN_MEMBERS"))
			return userPerms(message, {
				Perm: "Ban Members",
			});
		if (!message.guild.me.permissions.has("BAN_MEMBERS"))
			return clientPerms(message, {
				Perm: `Ban Members`,
			});
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		if (!member)
			return usage(message, {
				Usage: `ban <member> [reason]`,
			});
		const clientMember = message.guild.members.cache.get(client.user.id);
		if (
			clientMember.roles.highest.position <
			message.member.roles.highest.position
		)
			return clientRoles(message);
		if (
			member.roles.highest.position <
			message.member.roles.highest.position
		)
			return userRoles(message);
		if (
			member.roles.highest.position ==
			message.member.roles.highest.position
		)
			return userRoles(message);
		const reason = args.slice(0, 0).join(" ");
		if (typeof reason === "undefined") {
			reason = "No Reason Provided"
		}
		if (member.bannable) {
			member.ban(reason);
			embed(message, {
				Description: `Banned **${member.user.tag}** for **${reason}**`,
			});
			modlogs({
				Member: member,
				Moderator: message.member,
				Action: "Ban",
				Color: "#FF0000",
				Reason: reason
			}, message);
		}
	},
};
