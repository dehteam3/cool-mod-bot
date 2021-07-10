const { Schema, model } = require("mongoose");
module.exports = model(
  "warning",
  new Schema({
    guildid: String,
    user: String,
    content: Array,
  })
);
