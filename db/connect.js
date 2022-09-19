const mongoose = require('mongoose')

const mongooseOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}

const connectDB = (url) => {
	return mongoose.connect(url, mongooseOptions)
}

module.exports = { connectDB }
