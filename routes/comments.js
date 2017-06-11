var express = require("express");
var router = express.Router(); //Add {mergeParams: true} to parameter if you want to shorten route paths
var Brand = require("../models/brand");
var Comment = require("../models/comments");

router.get("brands/:id", (req,res)=>{
	Brand.findById(req.params.id, (err, brand)=>{
		if(err){
			console.log(err);
		} else {
			res.render("brands/" + req.params.id);
		}
	});
})







module.exports = router;


