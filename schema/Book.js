const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(

    {
        title: String,
        page : Number
      },


	{ collection: "book" }
);
BookSchema.index({ title: 1 });

module.exports = mongoose.model("Book", BookSchema);