var mongoose = require('mongoose');

// mongoose.model defines a constructor object
// that corresponds with a collection
// in your database

//first arg: name (singular)
// second arg: schema (objectliteral) that
// defines the properties allowed on 
// documents in the collection
var User = mongoose.model('User', {
	//key: arbitrary name for property
	//value: constructor that indicates the type
	id: mongoose.Schema.Types.ObjectId,
	email: String
});

module.exports = User;