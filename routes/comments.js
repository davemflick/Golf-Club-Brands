var express = require("express");
var router = express.Router(); //Add {mergeParams: true} to parameter if you want to shorten route paths
var Brand = require("../models/brand");
var Comment = require("../models/comments");
var bodyParser = require("body-parser");

// router.get("brands/:id", isLoggedIn, (req,res)=>{
// 	Brand.findById(req.params.id, (err, brand)=>{
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("brands/" + req.params.id);
// 		}
// 	});
// });

router.post("/brands/:id/comments", isLoggedIn, (req, res)=>{
	Brand.findById(req.params.id, (err, brand)=>{
		
		if(err){
			console.log(err);
			res.redirect("/brands");

		} else {
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				} else {
					//add username and id to comments and save
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					// // //put comments into brand page
					brand.comments.push(comment);
					brand.save();
					res.redirect("/brands/"+ brand._id)
				}
			});
		}
	});
});




//check if person is logged in (middleware function)
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;


