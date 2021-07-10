const { Client, Message, MessageEmbed } = require("discord.js");
const { error, embed, usage } = require("../../functions");
const { inspect } = require("util");
module.exports = {
  name: "eval",
  ownerOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const code = args.join(" ");
    if (!code)
      return usage(message, {
        Usage: `eval <code>`,
      });
    try {
      const result = await eval(code);
      const output = result;
      if (typeof result !== "string") {
        ouput = inspect(result);
      }
      embed(message, {
	      Description: `\`\`\`js\n${output}\`\`\``
      });
    } catch (e) {
      error(message, {
	      ErrorType: "Console Error",
	      Message: `\`\`\`js\n${e}\`\`\``
      })
    }
  },
};
