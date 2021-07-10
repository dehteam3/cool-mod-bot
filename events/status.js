const client = require("../index");

client.on("ready", async () => {
	client.user.setActivity("nothing.", {
		type: "STREAMING",
		url: "https://dehteam3.github.io/banroyalemanager"
	});
})