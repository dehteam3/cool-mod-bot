const m = require("mongoose");

module.exports = m.model(
  "muteRole-schema",
  new m.Schema({
    Guild: String,
    Role: String,
  })
);
