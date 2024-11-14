const express = require("express")
const taskController = require("./controllers/taskController.js")
const tasksMiddleware = require ("./middlewares/taskMiddleware.js")
const router = express.Router();

router.get('/tasks', taskController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldStatus,
    tasksMiddleware.validateFieldTitle,
     taskController.updateTask);


module.exports = router;