const { MessageEmbed, GuildChannel } = require("discord.js")
const client = require("../index");
const schema = require("../models/welcome");

client.on("guildMemberAdd", async (member) => {
	const data = await schema.findOne({ Guild: member.guild.id })
	if (!data) return;
	const r = member.guild.roles.cache.get(data.Role);
	member.roles.add(r);
	const ch = member.guild.channels.cache.get(data.Channel);
	ch.send(
		new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
			.setColor(client.color)
			.setDescription(`Hello ${member.toString()}, Welcome to **${member.guild.name}**.\nYou are our **${member.guild.memberCount}th member here.\nBe sure to check out <#838448572508667905> and get yourself some ping roles in <#850130514341527632>`)
			.setThumbnail(member.guild.iconURL({ dynamic: true }))
	)
})