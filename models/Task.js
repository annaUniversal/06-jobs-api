const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please, provide the category name"],
    maxlength: 50,
  },
  taskName: {
    type: String,
    required: [true, "Please, provide the task"],
    maxlength: 250,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default:'To Do',
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'Usre',
    required: [true, "Please, provide the user"],
  }
},{timestamps:true});


module.exports = mongoose.model('Tasks',TaskSchema)