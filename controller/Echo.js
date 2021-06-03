const express = require("express");
const router = express.Router();
const Echo = require("../schema/Echo");
const Book = require("../schema/Book");
const Param = require("../schema/Param");
const { connectDB, disconnectDB } = require("../dbutil");

router.get("/", async (req, res) => {
	res.send('Hello World!');
	
});

router.post("/echo_get", async (req, res) => {
    try {
		await connectDB();
		var ans = await Echo.find({ id: 2 });
        res.send(ans);
        
        await disconnectDB();
	} catch (e) {
		console.error(e);
	}

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

router.post("/echo_qs/:param", async (req, res) => {
	const { param } = req.params;


    try {
		await connectDB();
		var ans = await Param.find({ params : param  });
        res.send(ans);
		await disconnectDB();
	} catch (e) {
		console.error(e);
	}

});
router.post("/echo_post", async (req, res) => {
	res.send('add data')
    

    try {
		await connectDB();
		await post();
		await disconnectDB();
	} catch (e) {
		console.error(e);
	}

});

const post = async () => {
	const data = {
        id: 1,
        name: "elon musk"
      }
	var ans = await Echo.insertMany([
		data,
	]);
};

module.exports = router;