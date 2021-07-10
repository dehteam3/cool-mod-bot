const { embed, modlogs } = require("../functions");
const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("message", async (message) => {
	if (message.author.bot) return;
	if (message.content.includes("nigga") || message.content.includes("nigger")) {
		const clientUser = message.guild.members.cache.get(client.user.id);
		if (message.member.roles.highest.position > clientUser.roles.highest.position) {
			message.member.ban("Saying the N word");
			modlogs({
				Member: message.member,
				Moderator: client.user,
				Action: "Ban",
				Reason: "Saying the N word",
				Color: "RED"
			}, message);
			message.delete()
		} else {
			message.delete();
			message.channel.send(`${message.member.toString()}`,
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(`This word is not allowed`)
					.setColor(client.color)
					.setFooter(`Executed by: ${client.user.tag}`)
					.setTimestamp()
			)
		}
	}
})