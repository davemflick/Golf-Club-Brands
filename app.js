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
var URL = process.env.DATABASEURL || 'mongodb://localhost/golf_brands_app';
mongoose.connect(URL);
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

//Express-session set up
app.use(require("express-session")({
	secret: "My secret message",
	resave: false,
	saveUninitialized: false
}));

//Set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to determine if user is logged in or not, pass to every template
app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	next();
});


//HOME PAGE
app.get("/", (req, res)=>{
	res.render("home", {title: 'My Top Brands'});
});

//Call routes
app.use(brandRoutes);
app.use(commentsRoutes);
app.use(authRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
	console.log("Golf Brands Server is connected");
});






