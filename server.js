const express = require("express");
const hbs = require("hbs");
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set("view engine",hbs);


app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n', (err) =>{
    if(err) {
      console.log(' Unable to append to Server log file ');
    }
  });
  next();
});
/*
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));
app.get("/",(req,res) =>{
    //res.send(" Hello express!");
/*
    res.send({
      name:"Babu Jayabalan",
      School: "SPG"
    }
  );
  */
res.render('index.hbs', {
  pageTitle: " Home Page",
  welcomeMessage: " Welcome to home page"
});

});

app.get("/about",(req,res) => {
  res.render('about.hbs', {
    pageTitle: " About Page",
    welcomeMessage: " Welcome to about information"
  });

})

app.get("/bad",(req,res) => {
  res.send({
    errorMessage: "Unable to provide response"
  })
})

app.listen("3000");
