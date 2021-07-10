const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const { error, userPerms, usage, embed, modlogs } = require("../../functions");

module.exports = {
	name: "mute",
	/**
	 * @param {Message} message
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_ROLES"))
			return userPerms(message, {
				Perm: `Manage Roles`,
			});
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);

		if (!member)
			return usage(message, {
				Usage: `mute <member> [reason]`,
			});
		const schema = require("../../models/mute");
		const data = await schema.findOne({ Guild: message.guild.id });
		if (!data)
			return error(message, {
				ErrorType: "404",
				Message: `I couldn't find the mute role`,
			});
		const role = message.guild.roles.cache.get(data.Role);
		if (member.roles.cache.has(role))
			return error(message, {
				ErrorType: `Already Exists`,
				Messages: `**${member.user.tag}** have been already muted`,
			});
		await member.roles.add(role);
		const reason = args.slice(0).join(" ") || "No Reason Provided";
		embed(message, {
			Description: `Muted **${member.user.tag}** for **${reason}**`,
		});
		modlogs({
			Member: member,
			Moderator: message.member,
			Action: "Mute",
			Color: "#00FFD1",
			Reason: reason
		}, message);
	},
};
