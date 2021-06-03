const mongoose = require("mongoose");
const EchoSchema = mongoose.Schema(
    {
        id: Number,
        name: String
      },


	{ collection: "echo" }
);

EchoSchema.index({ id: 1 });

module.exports = mongoose.model("Echo", EchoSchema);

