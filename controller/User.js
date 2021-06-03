const express = require("express");
const router = express.Router();
const User = require("../schema/User");

router.get("/echo/:username", (req, res) => {
	res.json({ username: req.params.username, query: req.query });
});

router.get("/all_user", async (req, res) => {
	var ans = await User.find();
	res.json(ans);
});

router.get("/", async (req, res) => {
	res.send('Hello World!')



});




router.post("/add", async (req, res) => {
	var { a, b } = req.body;
	if (typeof a !== "number" || typeof b !== "number")
		return res.status(400).json({ error: "input must be number" });

	res.json({ result: a + b });
});

module.exports = router;