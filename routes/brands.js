var express = require("express");
var router =  express.Router();
var Brand = require("../models/brand");

//INDEX ROUTE
router.get("/brands", (req, res)=>{
	Brand.find({}, (err, brand)=>{
		brand = brand.sort((a,b)=> a.rank-b.rank);
		return err ? console.log(err) : res.render("brands", {brands: brand});
	})
});

//NEW ROUTE
router.get("/brands/new", (req, res)=>{
	res.render("newBrand");
});



//CREATE ROUTE --> New brand
router.post("/brands", (req, res)=>{
	if(req.body.image === ""){req.body.image = golfBrandSchema.image;}
	Brand.create(req.body, (err, brand)=>{
		if(err){
			alert("something went wrong on submit");
			console.log(err);
			res.redirect("/brands");
		} else {
			res.redirect("/brands");
		}
	})

});


//SHOW ROUTE
router.get("/brands/:id", (req,res)=>{
	Brand.findById(req.params.id).populate("comments").exec((err, brand)=>{
		if(err){
			alert("Something went wrong");
			res.redirect("/brand");
		} else {
			res.render("showBrand", {brand: brand});
		}
	});
});

//EDIT UPDATE
router.get("/brands/:id/edit", (req,res)=>{
	Brand.findById(req.params.id, (err, brand)=>{
		if(err){
			alert("Something went wrong");
			res.redirect("/brand");
		} else {
			res.render("editBrand", {brand: brand});
		}
	});
});


//UPDATE ROUTE
router.put("/brands/:id", (req,res)=>{
	Brand.findByIdAndUpdate(req.params.id, req.body, (err, brand)=>{
		if(err){
			alert("Something went wrong");
			res.redirect("/brands");
		} else {
			res.redirect("/brands/" + req.params.id);
		}
	});
});



//DESTROY ROUTE
router.delete("/brands/:id",(req,res)=>{
	Brand.findByIdAndRemove(req.params.id, (err,brand)=>{
		if(err){
			console.log(err);
			res.redirect("/brands");
		} else {
			res.redirect("/brands");
		}
	});
});


module.exports = router;