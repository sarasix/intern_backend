const express = require("express");
const echoRoute = require("./controller/Echo");
const todoRoute = require("./controller/Todo");
const { connectDB, disconnectDB } = require("./dbutil");
const httpShutdown = require("http-shutdown");
var bodyParser = require('body-parser')

const main = async () => {
	var app = express();
	app.use(bodyParser.json())
	await connectDB();
	var server = httpShutdown(app.listen(3000));


	app.use("/app/echo", echoRoute);
	app.use("/no_auth/todos", todoRoute);
	


	var called = false;
	const shutdown = () => {
		if (called) return;
		called = true;
		console.log("shutdown");
		server.shutdown(async (err) => {
			try {
				await disconnectDB();
				console.log("disconnect");
				return process.exit(0);
			} catch (e) {
				err = e;
			}
			console.error(err);
			return process.exit(1);
		});
	};
	process.once("SIGINT", shutdown).once("SIGTERM", shutdown);
};

main();
