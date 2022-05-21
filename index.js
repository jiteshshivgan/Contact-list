const express=require('express');
const path = require('path');
const { runInNewContext } = require('vm');
const port = 8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
//This Contact will now be use to create entries.

//Index.js is server file
const app=express();

//what to use as a view engine
app.set('view engine', 'ejs');
//where to look out for views
app.set('views', path.join(__dirname, 'views'));



var contactList =[
    {
        name: "Jitesh Shivgan",
        phone: "8440093177"
    },
    {
        name:"Akash Dudi",
        phone:"9800188797"
    },
    {
        name: "Ravi Ranwa",
        phone:"8356203200"
    }
]
//Before our controller access the data is called middleware
//urlencoded only read the form data we submit not the params
app.use(express.urlencoded());

app.use(express.static('assets'));



// We need to send these phone number to our contact list
app.get('/',function(req,res){
    
    //Let us first fetch the contact
    //find{} in this you can write your query. For eg: find{name:"Jitesh"}
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching the contact from db');
            return;
        }

        return res.render('home', {
            title: "Contact list",
            contact_list: contacts
        });
    });
    
    // return res.render('home', {
    //     title: "Contact list",
    //     contact_list: contactList
    // });
})

app.get('/practice', function(req, res){

    return res.render('practice', {
        title: "Let us play with ejs"
       
    });
})


//For deleting a contact get the query from url and find the index

app.get('/delete-contact/', function(req,res){
    //get the id from the query in the parameter in the url
    console.log(req.params);
    let id =req.query.id;

    //find the contact in the database using id and delete it
    //There is a function which automatically find and delete using id.
    //As we are deleting something so there is no second argument in the function.
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    })

});









app.post('/create-contact', function(req,res){
    // return res.redirect('/practice') 
    console.log(req.body.name);
    
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('Error in creating a contact', err);
            return;
        }

        console.log('***************', newContact);
        return res.redirect('back');
    });

    
    
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    }

    console.log('Yup! My express server is running on port: ',port);

})