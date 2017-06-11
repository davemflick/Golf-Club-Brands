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
var Comment = require("./models/comments");
var User = require("./models/user");

//Routes
var brandRoutes = require("./routes/brands");
var commentsRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

//Set up Views and Public
app.set("view engine", "pug");
app.use(express.static("public"));

//Set up Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up Method-Override
app.use(methodOverride("_method"));

//Set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//HOME PAGE
app.get("/", (req, res)=>{
	res.render("home", {title: 'My Top Brands'});
});

//Call routes
app.use(brandRoutes);
app.use(commentsRoutes);
app.use(authRoutes);


app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Golf Brands Server is connected");
});






