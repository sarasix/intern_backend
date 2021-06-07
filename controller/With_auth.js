const express = require("express");
const router = express.Router();
const { connectDB, disconnectDB } = require("../dbutil");
const tokenHandler = require('../auth/auth.js');

var ObjectId = require('mongodb').ObjectID;
const User = require("../schema/User.js");
const scrypt = require('../scrypt.js');



router.post("/", tokenHandler,async (req, res) => {
	
    const ans = await Todo.create(req.body);
    if (!ans) {
        res.status(400).json({eror : "can not create", data : req.body})
    }
    res.status(201).json({ successs: true, data: ans });

});




router.put("/:id", tokenHandler,async (req, res) => {
    const  id  = req.params.id;

	const update = await Todo.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
      });
    if (!update) {
        res.status(400).json({eror : "can not found "+id.toString()})
    }
    res.status(200).json({success : true ,data : update})
});

router.delete("/:id", tokenHandler,async (req, res) => {
    const  id  = req.params.id;
	const del = await Todo.findByIdAndDelete(id);
    if (!del) {
        res.status(400).json({eror : "con not found "+id.toString()})
    }
    res.status(200).json({success : true ,data : del})

});





module.exports = router;