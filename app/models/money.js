var mongoose = require('mongoose');

module.exports = mongoose.model('Money', {
	date: {
		type: Date,
		default: new Date()
	},
	type: {
		type: String,
		default: ''
	},
	amount: {
		type: Number,
		default: 0
	},
	quantity: {
		type : Number,
		default: 0
	}
});
