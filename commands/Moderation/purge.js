const { error, embed, userPerms, usage } = require("../../functions");
const { Message, Client } = require("discord.js");

module.exports = {
	name: "purge",
	aliases: ["clear", "delete"],
	/**
	 * @param {Client} client 
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
			return userPerms(message, {
				Perm: "Manage Messages"
			});
		const msgs = args.join(" ");
		if (!msgs) return usage(message, {
			Usage: "purge <amount>"
		});
		if (isNaN(msgs) || parseInt(msgs) <= 0)
			return error(message, {
				ErrorType: "Something went wrong",
				Message: "Something Went Wrong\nMaybe the amount is not a number\nThe amount is lower than 1\nThe messages are longer than 14 days"
			});
		let amount;
		if (parseInt(msgs) > 100) {
			amount = 100;
		} else {
			amount = parseInt(msgs)
		}
		message.delete();
		try {
			message.channel.bulkDelete(amount, true)
		} catch (e) {
			error(message, {
				ErrorType: "Something went wrong",
				Message: "Something Went Wrong\nMaybe the amount is not a number\nThe amount is lower than 1\nThe messages are longer than 14 days"
			})
		}
	}
}