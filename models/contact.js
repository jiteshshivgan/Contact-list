const mongoose=require('mongoose');
//Import mongoose as it is used to create schema
//Mongoose library will have same instance as it was imported in mongoose.js

//Creating schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    }
});

//Since we have created our schema we have to tell what would be the name for collection of schema
//What we want our collection to be called in database where it would be stored. Nomenclature for collection name 
//Start with the capital letter
const Contact= mongoose.model('Contact', contactSchema);

//finally we just need to export this
module.exports=Contact;