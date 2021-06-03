const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://root:root@cluster0.iikp1.mongodb.net/testDB?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				autoIndex: false,
				
			}
		);
	} catch (err) {
		throw new Error(err);
	}
};

const disconnectDB = async () => {
	try {
		await mongoose.disconnect();
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = { connectDB, disconnectDB };