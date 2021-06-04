const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const Todo = require("../schema/Todo.js");
// var bodyParser = require('body-parser')
// express.use(bodyParser.urlencoded({ extended: false }))
// express.use(bodyParser.json())
// const app = express()
// app.use(express.json());
// const bodyParser  = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));

router.get("/",async (req, res) => {
	
    var ans = await Todo.find();
    if (!ans) {
        res.status(400).json({eror : "eror"})
    }
    res.status(200).json({success : true , count :ans.length,data : ans });

});

router.post("/",async (req, res) => {
	console.log("==================================",req.body)
    const ans = await Todo.create(req.body);
    if (!ans) {
        res.status(400).json({eror : "can not create", data : req.body})
    }
    res.status(201).json({ successs: true, data: ans });

});

router.get("/:id",async (req, res) => {
	const  id  = req.params.id;
    var ans = await Todo.find({_id : ObjectId(id)});
    // if (!ans) {
    //     res.status(400).json({eror : "can not found ${id}"})
    // }
    res.status(200).json({success : true ,data : ans});
   

});


router.put("/:id",async (req, res) => {
    const  id  = req.params.id;

	const update = await Todo.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
      });
    if (!update) {
        res.status(400).json({eror : "can not found ${id}"})
    }
    res.status(200).json({success : true ,data : update})
});

router.delete("/:id",async (req, res) => {
    const  id  = req.params.id;
	const del = await Todo.findByIdAndDelete(id);
    if (!del) {
        res.status(400).json({eror : "con not found ${id}"})
    }
    res.status(200).json({success : true ,data : del})

});
module.exports = router;