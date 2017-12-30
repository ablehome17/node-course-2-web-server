
const express = require('express');

const hbs = require('hbs');

const fs = require('fs');


var app = express(); // making new Express App

hbs.registerPartials(__dirname + '/views/partials'); // Take directory to use for all of your handlebar partial files

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(function (req,res,next){
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function(err){
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use( function (req,res,next) {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});


app.get('/', function (req,res) {
//    res.send('<h1>Hello Express!<h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:  'Welcome to my website'
    });
});

app.get('/about', function (req,resp) {
    resp.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', function (req,resp) {
    resp.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(3000, function(){
    console.log('Server is up on port 3000')
});