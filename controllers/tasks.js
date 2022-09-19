const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({})
	//when sending the response, you can also structure it such that you receive an object i.e.
	//res.status(200).json({ allTasks: allTasks })
	//This comes in handy if the response object is to be used later on
	res.status(200).json({ tasks, amount: tasks.length })
})

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body)
	res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
	//Giving id the alias of taskID
	const { id: taskID } = req.params
	//const taskID = req.params.id will give same result

	//We can always findByID, but findOne allows us to find using one of the various fields in the collection
	const task = await Task.findOne({ _id: taskID })

	/* This error check is because if an id with the same amount of characters as the ids in the DB is given, mongoose will not view it as an error. Hence we must check that even if an id with the same amount of characters is given, that id actually exists in the database. */
	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404))
	}

	res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	const update = req.body
	const task = await Task.findOneAndUpdate({ _id: taskID }, update, {
		new: true,
		runValidators: true
	})

	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404))
	}

	res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	const task = await Task.findOneAndDelete({ _id: taskID })

	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404))
	}

	res.status(200).json({ task })
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }
