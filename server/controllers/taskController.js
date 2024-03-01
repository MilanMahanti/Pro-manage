const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Task = require("../models/tasksModel");
const moment = require("moment");
const { default: mongoose } = require("mongoose");
exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = { ...req.body, createdBy: req.user.id };
  const task = await Task.create(newTask);
  res.status(201).json({
    task,
  });
});

exports.getAllTask = catchAsync(async (req, res, next) => {
  let query = { createdBy: req.user.id };
  if (!req.query.filter || req.query.filter === "week") {
    query.createdAt = {
      $gte: moment().startOf("week").toDate(),
      $lte: moment().endOf("week").toDate(),
    };
  } else if (req.query.filter === "month") {
    query.createdAt = {
      $gte: moment().startOf("month").toDate(),
      $lte: moment().endOf("month").toDate(),
    };
  } else if (req.query.filter === "today") {
    query.createdAt = {
      $gte: moment().startOf("day").toDate(),
      $lte: moment().endOf("day").toDate(),
    };
  }

  const tasks = await Task.find(query);
  res.status(200).json({
    tasks,
  });
});

exports.getSingleTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    task,
  });
});

exports.updateSingleTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({
    msg: "Task deleted",
  });
});

exports.getTaskStatistics = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const taskCountsByStatus = await Task.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const taskCountsByPriority = await Task.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalDueTasks = await Task.countDocuments({
    createdBy: new mongoose.Types.ObjectId(userId),
    status: { $ne: "done" },
    dueDate: { $lte: new Date() },
  });

  const simplifiedStatistics = {
    taskCounts: {
      byStatus: taskCountsByStatus.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {}),
      byPriority: taskCountsByPriority.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {}),
    },
    totalDueTasks,
  };

  res.status(200).json(simplifiedStatistics);
});
