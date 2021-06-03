const mongoose = require("mongoose");

const ParamSchema = mongoose.Schema(
	


    {
        params : Number
      },


	{ collection: "param" }
);
ParamSchema.index({ params: 1 });

module.exports = mongoose.model("Param", ParamSchema);