const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Must provide a task name'],
		trim: true,
		minlength: [4, 'Task cannot have less than 4 characters'],
		maxlength: [20, 'Task cannot be longer than 20 characteres']
	},
	completed: { type: Boolean, default: false }
})
//For more validation options, visit https://mongoosejs.com/docs/validation.html

module.exports = mongoose.model('Task', TaskSchema)
/*
  The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, the model Task is for the taaks collection in the database.
*/
