const { MessageEmbed, Message, Client } = require("discord.js");
const { embed } = require("../../functions");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    embed(message, {
      Description: `Ping: ${client.ws.ping} MS`,
    });
  },
};
