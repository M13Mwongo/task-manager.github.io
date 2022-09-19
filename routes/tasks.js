const express = require('express')
const router = express.Router()

let {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
