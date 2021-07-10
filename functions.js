const { MessageEmbed, Message, Client } = require("discord.js");
const client = require("./index");
const config = require("./config.json");

module.exports = {
	embed: async function(message, { Description }) {
		const embed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(Description)
			.setColor(config.color)
			.setFooter(`Executed by: ${client.user.tag}`)
			.setTimestamp();
		message.lineReplyNoMention(embed);
	},
	userPerms: async function(message, { Perm }) {
		const embed = new MessageEmbed()
			.setTitle(`Error: User Permissions`)
			.setDescription(`You need \`${Perm}\` to run this command`)
			.setColor(client.color)
			.setFooter(
				`Requested by: ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},
	clientPerms: async function(message, { Perm }) {
		const embed = new MessageEmbed()
			.setTitle(`Error: Client Permissions`)
			.setDescription(`I need \`${Perm}\` to run this command`)
			.setColor(client.color)
			.setFooter(
				`Requested by: ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},
	usage: async function(message, { Usage }) {
		const embed = new MessageEmbed()
			.setTitle(`Error: Usage`)
			.setDescription(`Try: ${config.prefix}${Usage}`)
			.setColor(config.color)
			.setFooter(
				`Requested by: ${message.member.user.tag}`,
				message.member.user.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},
	clientRoles: async function(message) {
		const embed = new MessageEmbed()
			.setTitle(`Error: Client Permissions`)
			.setDescription(
				`I don't have permissions to control someone with a higher role`
			)
			.setColor(client.color)
			.setFooter(
				`Requested by: ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},
	userRoles: async function(message) {
		const embed = new MessageEmbed()
			.setTitle(`Error: User Permissions`)
			.setDescription(
				`You don't have permissions to control someone with a higher role`
			)
			.setColor(client.color)
			.setFooter(
				`Requested by: ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},
	error: async function(message, { ErrorType, Message }) {
		const embed = new MessageEmbed()
			.setTitle(`Error: ${ErrorType}`)
			.setDescription(Message)
			.setColor(client.color)
			.setFooter(
				`Requested by: ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.lineReplyNoMention(embed);
	},

	modlogs: async function(
		{ Member, Moderator, Action, Color, Reason },
		message
	) {
		const schema = require("./models/modlogs");
		const data = await schema.findOne({
			Guild: message.guild.id,
		});
		if (!data) return;
		const channel = message.guild.channels.cache.get(data.Channel);
		const embed = new MessageEmbed()
			.setTitle(`Action Took: **${Action}**`)
			.setColor(Color)
			.addField(
				"Moderator",
				`<@!${Moderator.user.id}> / \`${Moderator.user.tag}\` (${
				Moderator.user.id
				})`
			)
			.addField(
				"Member",
				`<@!${Member.user.id}> / \`${Member.user.tag}\` (${Member.user.id})`
			)
			.addField("Reason", `${Reason || "No Reason Provided"}`)
			.setThumbnail(Member.user.displayAvatarURL({ dynamic: true }));
		channel.send(embed);
	},
};
