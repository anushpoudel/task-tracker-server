const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    reminder: {
      type: Boolean,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: new Date(),
    // },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
