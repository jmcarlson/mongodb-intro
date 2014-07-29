var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js');

mongoose.connect('mongodb://localhost/wingzingly');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});


app.post('/signup', function(req, res) {
	var user = new User({
		email: req.body.email
	});
	// instance method
	// user.save();
	// res.send('Thanks');
	user.save(function(error, results) {
		if(error) {
			console.log(error);
		}
		else {
			console.log(results);
			// res.send('Tanks');
			res.render('change', {
			email: results.email,
			userid: results._id
			});
		}
	});

	// Render change  form after sign up
	// var userid = User.find({email: req.body.email});
	// console.log(userid);

});


app.post('/change', function(req, res) {
	// var user = new User({
	// 	email: req.body.email
	// });
	// // instance method
	// user.save();
	console.log(req.body);
	var userObj = User.find({_id: req.body.id});
	console.log(userObj);
	userObj.update({email: req.body.email});
	res.send('Thanks');

});


app.get('/viewusers', function(req, res) {
	// static method; find all users
	User.find({}, function(error, results) {
		if(error) {
			res.send(500, 'Error accessing users collection');
		}
		else {
			// res.send(results);
			res.render('users', { users: results });
		}
	});
});

var server = app.listen(5614, function() {
	console.log('Express server listening on port ' + server.address().port);
});
