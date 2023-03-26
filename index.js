// set up Express
var express = require('express');
var app = express();

// set up BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// import the User class from User.js
var User = require('./Users.js');
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

// endpoint for showing all the common rooms in the database
app.use('/allRooms', (req, res) => {
	commonRooms.find( {}, (err, cR) => {
		if (err) {
		    res.type('html').status(200);
		    console.log('uh oh' + err);
		    res.write(err);
		}
		else {
		    if (cR.length == 0) {
				res.type('html').status(200);
				res.write('There are no common rooms');
				res.end();
				return;
		    }
		    else {
				res.type('html').status(200);
				res.write('Here are the common rooms in the database:');
				res.write('<ul>');
				// show all the common rooms
				cR.forEach( (commonroom) => {
					res.write('<li>');
					res.write('Name: ' + commonroom.roomName + '; capacity: ' + commonroom.capacity + '; dorm name: ' + commonroom.dorm + '; floor number: ' + commonroom.floor + '; time slots: ' + commonroom.timeSlots  );
					// this creates a link to the /delete endpoint
					res.write(" <a href=\"/delete?name=" + commonroom.roomName + "\">[Delete]</a>");
					res.write('</li>');
				});
				res.write('</ul>');
				res.end();
		    }
		}
	}).sort({ 'dorm': 'asc' });
});

//endpoint for creating a new common room from "Common Room" request form
app.use('/create', (req, res) =>{
	var newCommonRoom = new commonRooms ({
			roomName: req.body.name,
			capacity: req.body.capacity,
			dorm: req.body.dorm,
			floor: req.body.floor,
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
			res.send('successfully added ' + newCommonRoom.roomName + ' to the database');
		}
	});
});

//endpoint for deleting a common room
app.use('/delete', (req, res) => {
       var CommonRoom = {'CommonRoom' : req.query.CommonRoom};
	Room.findOneAndDelete(CommonRoom, (err, room) => {
		if (err) {
			console.log("error" + err);
		}
		else if (!room) {
			console.log("not a common room" + err);
		}
	});
	res.send('successfully deleted ' + CommonRoom.roomName + ' from the database');
	res.redirect('/allRooms');
});

//endpoint for editing the average capacity of a communal space
app.use('/updateCap', (req, res) => {
	var CommonRoom = {'CommonRoom' : req.query.CommonRoom}; // common room we are updating
	var newCap = req.body.capacity; // changing the capacity of this common room
	
	Room.findOneAndUpdate(CommonRoom, newCap, (err, orig) => {
		if (err) {
			res.type('html').status(200);
		    	console.log(err);
		    	res.end();
		}
		else if (!orig) {
			res.type('html').status(200);
		    	console.log("original capacity not found "+ err);
		    	res.end();
		}
		else {
			res.send('successfully updated the capacity of common room ' + CommonRoom.roomName);
			res.redirect('/allRooms');
		}	    
	});	
});

// endpoint for editing the communal space name 
app.use('/updateTimeslots', (req, res) => {
	var CommonRoom = {'CommonRoom' : req.query.CommonRoom}; // common room we are updating
	var newTime = {'$set' : {'timeSlots' : req.body.time}} // changing the name of this communal space
	
	Room.findOneAndUpdate(CommonRoom, newTime, (err, orig) => {
		if (err) {
			res.type('html').status(200);
		    	console.log(err);
		    	res.end();
		}
		else if (!orig) {
			res.type('html').status(200);
		    	console.log("original time not found "+ err);
		    	res.end();
		}
		else {
			res.send('successfully updated the time slot ' + CommonRoom.name);
		}	
	});
});

// endpoint for editing the location marks on the map (floor)
app.use('/updateFloor', (req, res) => {
	var CommonRoom = {'CommonRoom' : req.query.CommonRoom}; // common room we are updating
	var newLoc = {'$set' : {'floor' : req.body.floor}} // changing the floor location of this communal space
	
	Room.findOneAndUpdate(CommonRoom, newLoc, (err, orig) => {
		if (err) {
			res.type('html').status(200);
		    	console.log(err);
		    	res.end();
		}
		else if (!orig) {
			res.type('html').status(200);
		    	console.log("original floor location not found "+ err);
		    	res.end();
		}
		else {
			res.send('successfully updated the floor location of common room ' + CommonRoom.name);
		}	
	});
});

//endpoint for editing the availability of a communal space
app.use('/updateAvail', (req, res) => {
	var CommonRoom = {'CommonRoom' : req.query.CommonRoom}; // common room we are updating
	var newAvail = req.body.availability; // changing the availability of this common room
	
	Room.findOneAndUpdate(CommonRoom, newAvail, (err, orig) => {
		if (err) {
			res.type('html').status(200);
		    	console.log(err);
		    	res.end();
		}
		else if (!orig) {
			res.type('html').status(200);
		    	console.log("original availability not found "+ err);
		    	res.end();
		}
		else {
			res.send('successfully updated the availability of common room ' + CommonRoom.roomName);
			res.redirect('/allRooms');
		}	    
	});	
});

//endpoint for editing the number of consecutive reservations of a communal space
app.use('/updateNumReserve', (req, res) => {
	var CommonRoom = {'CommonRoom' : req.query.CommonRoom}; // common room we are updating
	// changing the number of consecutive reservations of this common room
	var newNumReserve = req.body.numReserve;
	
	Room.findOneAndUpdate(CommonRoom, newNumReserve, (err, orig) => {
		if (err) {
			res.type('html').status(200);
		    	console.log(err);
		    	res.end();
		}
		else if (!orig) {
			res.type('html').status(200);
		    	console.log("original number of reservations not found "+ err);
		    	res.end();
		}
		else {
			res.send('successfully updated the number of reservations of common room ' + CommonRoom.roomName);
			res.redirect('/allRooms');
		}	    
	});	
});

/*************************************************/

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/homepage.html'); });

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
