const express = require('express');
const path = require('path');
require('dotenv').config();
var nodemailer = require('nodemailer');
const app = new express; 
//app.use(express.static('public/images')); 
//app.use('/images', express.static('images'));
app.use(express.static(__dirname + '/public/images'));
const nav = [
    { link: "/", title: "Landing Page" },
    { link: "/greet", title: "Greeting Page" },
    { link: "/mail", title: "Mail" },
    { link: "/preview", title: "Greetings" }
];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Setting up ejs engine and ejs file path
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Routing
app.get('/', function (req, res) {
    res.render("index",
        {
            nav
        });
})
app.post('/greet', function (req, res) {
    
    var yname=req.body.yname;
    var fname=req.body.fname;
    var email=req.body.email;
    res.render("greeting",
       {
             nav,yname,fname,email
        });
})

app.get('/preview', function (req, res) {
    //console.log("reached preview in index")    
    res.render("greetings",
       {
             nav
        });
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wishyouon2022@gmail.com',
      pass: 'cwlomsbuzzptsfun'
    }
  });


  app.post('/mail', function (req, res) {
    
    var yname=req.body.yname;
    var fname=req.body.fname;
    var email=req.body.email;
  
  var mailOptions = {
    from: 'wishyouon2022@gmail.com',
    to: email,
    subject: 'Happy 2022 '+fname,
    text:  'CLick on the link to view the wish from '+yname, 
    html: '<b>Hi '+fname+' your friend '+yname+' send you new year wishes, check it <a href="https://wish2022.herokuapp.com/preview">Click Here to view </a> </b>' 
   /* html: '<a href="http://localhost:3000/preview"></a>'*/
 }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.render("index",
  {
        nav
   });
})


//import nodemailer from 'nodemailer';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));

 //creating a port
