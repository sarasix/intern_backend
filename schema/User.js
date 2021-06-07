const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('../config_env');

const UserSchema = mongoose.Schema(
	{
		name: String,
		email : String,
		password : String
	},
	{collection: "user" }
);

UserSchema.index({ username: 1 });

UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ user_id: this._id }, process.env.JWT_SECRET, {
	  expiresIn: process.env.JWT_EXPIRE,
	});
  };



module.exports = mongoose.model("user", UserSchema);