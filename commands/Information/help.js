const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["cmds"],
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle("Help Menu")
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Prefix: **${client.prefix}**`)
			.addField("🛠 Configuration Commands", "> `config`, `welcomeConfig`, `welcomeDisable`")
			.addField("📰 Information Commands", "> `help`, `ping`, `say`")
			.addField("⚠ Moderation Commands", "> `ban` | `clearwarns` | `kick` | `modnick` | `mute` | `removewarn` | `unmute` | `warn` | `warnings` | `lock` | `unlock` | `nickname` | `purge` | ")
			.addField("👨‍💻 Developer Commands", "> `eval`")
			.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(client.color)
		message.lineReplyNoMention(embed)
		
		// const configEmbed = new MessageEmbed()
		// 	.setTitle("Help Menu")
		// 	.setColor(client.color)
		// 	.setDescription("Configuration Commands")
		// 	.addField("Commands:", "> `config` | `welcomeConfig` | `welcomedisable`")
		// 	.setFooter(
		// 		`Requested by: ${message.author.tag}`,
		// 		message.author.displayAvatarURL({ dynamic: true })
		// 	)
		// const developerEmbed = new MessageEmbed()
		// 	.setTitle("Help Menu")
		// 	.setColor(client.color)
		// 	.setDescription("Developer Commands")
		// 	.addField("Commands:", "> `eval`")
		// 	.setFooter(
		// 		`Requested by: ${message.author.tag}`,
		// 		message.author.displayAvatarURL({ dynamic: true })
		// 	)
		// const infoEmbed = new MessageEmbed()
		// 	.setTitle("Help Menu")
		// 	.setColor(client.color)
		// 	.setDescription("Information Commands")
		// 	.addField("Commands:", "> `help` | `ping` | `say`")
		// 	.setFooter(
		// 		`Requested by: ${message.author.tag}`,
		// 		message.author.displayAvatarURL({ dynamic: true })
		// 	)
		// const modEmbed = new MessageEmbed()
		// 	.setTitle("Help Menu")
		// 	.setColor(client.color)
		// 	.setDescription("Moderation Commands")
		// 	.addField("Commands:", "> `ban` | `clearwarns` | `kick` | `modnick` | `mute` | `removewarn` | `unmute` | `warn` | `warnings` | `lock` | `unlock` | `nickname` | `purge` | ")
		// 	.setFooter(
		// 		`Requested by: ${message.author.tag}`,
		// 		message.author.displayAvatarURL({ dynamic: true })
		// 	)
		// const pages = [
		// 	infoEmbed,
		// 	configEmbed,
		// 	modEmbed,
		// 	developerEmbed
		// ];
		// const time = 120000
		// const { ReactionPages } = require("reconlx");
		// ReactionPages(message, pages, true, ['◀', '▶'], time)
	}
}