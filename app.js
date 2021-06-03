const express = require("express");
const echoRoute = require("./controller/Echo");
const todoRoute = require("./controller/Todo");
const userRoute = require("./controller/User");
const { connectDB, disconnectDB } = require("./dbutil");
const httpShutdown = require("http-shutdown");
const bodyParser = require("body-parser");

const main = async () => {
	var app = express();

	//body parser
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use("/echo", echoRoute);
	app.use("/todos", todoRoute);
	app.use("/", userRoute);

	await connectDB();
	var server = httpShutdown(app.listen(3000));

	// graceful shutdown
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