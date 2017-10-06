var mongoose = require('mongoose');

var SchemaMap = {};
// schema for money object
SchemaMap.money = new mongoose.Schema({
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

module.exports = mongoose.model('Money', SchemaMap.money);
