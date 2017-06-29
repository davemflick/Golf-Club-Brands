var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//show register form
router.get("/register", (req, res)=>{
	res.render("register");
})

//handle sign-up logic 
router.post("/register", (req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			res.render("register");
		} else {
			passport.authenticate("local")(req, res, ()=>{
				res.redirect("/brands");
			});
		}
	});
});


//show login form
router.get("/login", (req, res)=>{
	res.render("login");
});

//handle login logic ---> uses middleware
router.post("/login",
	passport.authenticate("local", {
		successRedirect: "/brands",
		failureRedirect:"/login"
	}),(req,res)=>{});

router.get("/logout", (req, res)=>{
	req.logout();
	res.redirect("/");
});

module.exports = router;

