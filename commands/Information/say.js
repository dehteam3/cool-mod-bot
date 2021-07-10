const { embed, usage } = require("../../functions");

module.exports = {
	name: "say",
	run: async (client, message, args) => {
		const m = args.join(" ");
		if (!m) return usage(message, {
			Usage: "say <message>"
		});
		embed(message, {
			Description: m
		})
	}
}