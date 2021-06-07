const express = require("express");
const router = express.Router();
const { connectDB, disconnectDB } = require("../dbutil");
const tokenHandler = require('../auth/auth.js');

var ObjectId = require('mongodb').ObjectID;
const User = require("../schema/User.js");
const scrypt = require('../scrypt.js');
router.post("/register",async (req, res) => {
	const {name,email,password} = req.body
    const ans = await User.create({
        name,
        email,
        password : await scrypt.encrypt(password)
    });
    if (!ans) {
        res.status(400).json({eror : "can not register", data : req.body})
    }
    res.status(200).json({ successs: true, data: ans });
});
router.post("/login",async (req, res) => {
	var ans = await User.findOne({email :req.body.email});
    if(!scrypt.verifyPassword(ans.password,req.body.password)){
        res.status(401).json({eror : "can not login", data : req.body})
        return;
    }
    let user = await  User.findOne({email :req.body.email}).select('+password')
    
    //cookie
    let token = user.getSignedJwtToken();
    res.status(200).cookie('token', token).json({ successs: true, data: ans });
    

    
});

router.post("/logout",tokenHandler,async (req, res) => {
	
   const {name,email,password,createdAt} = req.user
    let user = req.user
    if(!user){
        res.status(400).json({eror : "can not logout", data : req.body})
        return;
    }
    res.status(200).clearCookie("token").json({ successs: true, 
        data: {
            name,
            email,
            password,
            createAt : new Date()
        }});

});


module.exports = router;