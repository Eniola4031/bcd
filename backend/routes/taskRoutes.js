const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/", taskController.getAlltasks);
router.post("/createtask", taskController.createtask);
router.post("/gettaskById", taskController.gettaskById);
router.put("/updatetask", taskController.updatetask);
router.delete("/deletetask/:id", taskController.deletetask);

module.exports = router;
