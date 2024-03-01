const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id required."],
  },
  title: {
    type: String,
    required: [true, "Task needs to have a title"],
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done", "backlog"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "moderate", "high"],
    default: "low",
  },
  dueDate: {
    type: Date,
  },
  checklist: [checklistItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
