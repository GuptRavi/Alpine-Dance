const express =require("express");
const path = require("path");

// using mongodb mongoose and establishing connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});


const app = express(); // created an app
const port = 8000; // initializing port 


// DEFINING MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// mongoose model
const Contact = mongoose.model('contactDetails', contactSchema);


// EXPRESS SPECIFIC STUFF
// For serving static files
app.use('/public_static', express.static('public_static')); // '/public_static' --> it is a public_static folder in our current folder, which we have created manually

// helps to bring 'form' data to express
app.use(express.urlencoded()) // for url(html) encoded 'form' details to bring to our backend 


app.use(express.static(__dirname));

// Endpoints
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});



// post request 
// To save 'post' request 'markup' in 'database' using 'express', we have to use model called 'body-parser'
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then( () => {
        res.send("This item has been saved to the database")
    }).catch(()=>{ // if any error occur
        res.status(400).send("Item was not saved to the database")
    });
    // if you want to alert the user using bootStrap, put the code here
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sucessfully on port ${port}`);
});