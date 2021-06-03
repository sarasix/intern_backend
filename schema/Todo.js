const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema(
    
      {
        order: { type: Number, default: 1, immutable: true },
        title: { type: String ,required: true},
        createdAt: { type: Date, default: new Date() }
      },


	{collection: "todo" }
);
TodoSchema.pre("save",async function (next){
  var maxTodo = await TodoModel.countDocuments();
  if (!maxTodo) next();

  maxTodo = await TodoModel.find().sort('-order').limit(1);
  this.order = maxTodo[0].order + 1;

  next();


});

TodoSchema.index({order : 1 });

var TodoModel = mongoose.model("todo", TodoSchema);
module.exports = TodoModel;
