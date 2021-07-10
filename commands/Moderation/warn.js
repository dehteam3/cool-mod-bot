const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const prefix = require("../../config.json").prefix;
const {
	embed,
	userPerms,
	usage,
	clientPerms,
	clientRoles,
	error,
	modlogs
} = require("../../functions");
const db = require("../../models/warning");

module.exports = {
	name: "warn",
	aliases: ["w"],
	description: "Warns a member",
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
			return userPerms(message, {
				Perm: "Manage Messages",
			});

		const user =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		if (!user)
			return usage(message, {
				Usage: `warn <member> <reason>`,
			});
		const reason = args.slice(1).join(" ") || "No Reason Provided"
		db.findOne(
			{ guildid: message.guild.id, user: user.user.id },
			async (err, data) => {
				if (err) throw err;
				if (!data) {
					data = new db({
						guildid: message.guild.id,
						user: user.user.id,
						content: [
							{
								moderator: message.author.id,
								reason: reason,
							},
						],
					});
				} else {
					const obj = {
						moderator: message.author.id,
						reason: reason,
					};
					data.content.push(obj);
				}
				data.save();
			}
		);
		user.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(`You have been warn for **${reason}**`)
				.setColor(client.color)
				.setFooter(`Executed by: ${client.user.tag}`)
				.setTimestamp()
		);
		embed(message, {
			Description: `You warned **${user.user.tag}** for **${reason}**`,
		});
		modlogs({
			Member: user,
			Moderator: message.member,
			Action: "Warn",
			Color: "#000000",
			Reason: reason
		}, message);
	},
};
