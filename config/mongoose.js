//require the library
const mongoose=require('mongoose');
//This is how our mongoose will connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Verify whether it got connected to our database or not.
//The connection between the mongoose and database is our database.
//Acquire the connection to check whether it is successful.
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

//Above connection is open for me to interact with the database
db.once('open', function(){
    console.log('successfully connected to the database');
});

//Now just include this file while firing up the server