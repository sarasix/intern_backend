const express = require("express");
const router = express.Router();
const { connectDB, disconnectDB } = require("../dbutil");
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
const Todo = require("../schema/Todo.js");


router.get("/",async (req, res) => {
	
    const todo = await Todo.create(req.body);
    var ans = await Todo.find();
    res.send(ans);

});

router.post("/",async (req, res) => {
	
    const todo = await Todo.create(req.body);
    res.status(201).json({ successs: true, data: todo });

});

router.get("/:id",async (req, res) => {
	const { id } = req.params;
    var ans = await Todo.find({_id : ObjectId(id)});
    res.send(ans);
   

});


router.put("/:id",async (req, res) => {
    const { id } = req.params;
	const update = await Todo.findByIdAndUpdate(id,req.body)

});

router.delete("/:id",async (req, res) => {
    const { id } = req.params;
	const update = await Todo.findByIdAndDelete(id)

});
module.exports = router;