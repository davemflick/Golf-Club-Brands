//Dependincies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");

//Models
var Brand = require("./models/brand");

//Routes
var brandRoutes = require("./routes/brands");

//Set up Views and Public
app.set("view engine", "pug");
app.use(express.static("public"));

//Set up Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up Method-Override
app.use(methodOverride("_method"));

//HOME PAGE
app.get("/", (req, res)=>{
	res.render("home", {title: 'My Top Brands'});
});

//Call routes
app.use(brandRoutes);




app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Golf Brands Server is connected");
});






