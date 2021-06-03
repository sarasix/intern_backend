const express = require("express");
const router = express.Router();
const User = require("../schema/User");




router.get("/", async (req, res) => {
	res.send('Hello World!')
});
router.post("/echo_qs/:title/:page", async (req, res) => {
	const { title } = req.params;
    const { page } = req.params;

    try {
		await connectDB();
		var ans = await Book.find({ title : title , page: page  });
        res.send(ans);
		await disconnectDB();
	} catch (e) {
		console.error(e);
	}

});
module.exports = router;