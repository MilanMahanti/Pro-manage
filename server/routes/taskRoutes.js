const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, taskController.getAllTask)
  .post(authController.protect, taskController.createTask);

router
  .route("/stats")
  .get(authController.protect, taskController.getTaskStatistics);
router
  .route("/:id")
  .get(taskController.getSingleTask)
  .patch(authController.protect, taskController.updateSingleTask)
  .delete(authController.protect, taskController.deleteTask);

module.exports = router;
