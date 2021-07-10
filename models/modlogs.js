const m = require("mongoose");

module.exports = m.model(
  "modlogs-schema",
  new m.Schema({
    Guild: String,
    Channel: String,
  })
);
