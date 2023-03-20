// set up Express
var express = require('express');
var app = express();

// set up BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// import the User class from User.js
var User = require('./User.js');
var Room = require('./commonRooms.js');
const e = require('express');

/***************************************/

app.use('/hello', (req, res) => {
	res.send("Hello World");
});

// endpoint for creating a new person
// this is the action of the "create new person" form
app.use('/signup', (req, res) => {

});

app.use('/login', (req, res) => {

});

// endpoint for showing all the users enrolled in the database
app.use('/all', (req, res) => {
	//TO DO when Aminas headache clears up
});

app.rooms('/all', (req, res) => {
	//TO DO when Aminas headache clears up
});

//endpoint for creating a new common room from "Commom Room" request form
app.use('/create', (req, res) =>
	var newCommonRoom = new CommonRoom ({
			roomName: req.body.name
			capacity: req.body.capacity
			dorm: req.body.dorm
			floor: req.body.floor
			timeSlots: req.body.time
		    });

		// save the Common Room to the database
		newCommonRoom.save( (err) => { 
		if (err) {
		    	res.type('html').status(200);
		    	res.write('uh oh: ' + err);
		    	console.log(err);
		    	res.end();
		}
		else {
			 // display the "successfull created" message
			res.send('successfully added ' + newCommonRoom.name + ' to the database');
		}
	});
});

//endpoint for deleting a common room
app.use('/delete', (req, res) =>
       var commonRoom = {'commonRooms' : req.query.commonRooms};
	Room.findOneAndDelete(commonRoom, (err, room) => {
		if (err) {
			console.log("error" + err);
		} else if (!room) {
			console.log("not a common room" + err);
		}
	})
	res.redirect('/all');
});
/*************************************************/

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/homepage.html'); });

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
