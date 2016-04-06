var mongoose = require('mongoose');

var userModel = function() {

	var userSchema = mongoose.Schema({
		name: String
	});

	return mongoose.model('User', userSchema, 'user');
};

module.exports = new userModel();