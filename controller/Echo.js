const express = require("express");
const router = express.Router();
const { connectDB, disconnectDB } = require("../dbutil");

router.get("/", async (req, res) => {
	res.send('Hello World!');
	
});

router.get("/echo_get", async (req, res) => {
    res.json({message : "Echo from router..."});

});
router.get("/echo_qs", async (req, res) => {
	const {qs } = req.query;
	res.json(qs)

});
router.get("/echo_params/:params", async (req, res) => {
	const { params } = req.params;
	res.json({params : params})

});


router.post("/echo_post", async (req, res) => {
	const {body} = req.bosy
	res.json(body)

});

module.exports = router;