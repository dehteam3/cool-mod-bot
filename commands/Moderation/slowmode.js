const { Client, Message, MessageEmbed, Channel } = require("discord.js");
const config = require("../../config.json");
const prefix = require("../../config.json").prefix;
const {
  embed,
  userPerms,
  usage,
  clientPerms,
  clientRoles,
  modlogs,
  error
} = require("../../functions");
const ms = require("ms");

module.exports = {
  name: "slowmode",
  aliases: ["sm"],
  description: "Sets the slowmode for a channel",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return userPerms(message, {
			Perm: "Manage Channels"
		});
	String.prototype.toHHMMSS = function() {
			var sec_num = parseInt(this, 10);
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - hours * 3600) / 60);
			var seconds = sec_num - hours * 3600 - minutes * 60;

			if (hours < 10) {
				hours = '0' + hours;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			return hours + ':' + minutes + ':' + seconds;
		};

		const time = args[0];
		if (time < 0)
			return error(message, {
				ErrorType: "Something went wrong",
				Message: "Time must be higher than 0 seconds"
			})
		if (time > 21600)
			return error(message, {
				ErrorType: "Something went wrong",
				Message: "Time must be lower than 21600 seconds (6 hours)"
			})
		if (!time) {
			return usage(message, {
				Usage: "slowmode <time>"
			})
		}
		if (isNaN(time))
			return error(message, {
				ErrorType: "Something went wrong",
				Message: "Time must be numbers"
			})
		message.channel.setRateLimitPerUser(time, "Slowmode set")
		embed(message, {
			Description: `I set slowmode to **${time}** for ${message.channel.toString()}`
		})
  },
};
