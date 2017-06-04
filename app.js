var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

//Set up Views and Public
app.set("view engine", "pug");
app.use(express.static("public"));

//Set up mongodb and mongoose
mongoose.connect("mongodb://localhost/golf_brands_app");
var golfBrandSchema = new mongoose.Schema(
{
	name: String,
	image:{type: String, default: "http://www.orchidislandgolfandbeachclub.com/images/dynamic/getImage.gif?ID=3884041"},
	rank: Number,
	comments: {type:Array, default: []},
	about: String,
	created: {type: Date, default: Date.now}
});
var Brand = mongoose.model("Brand", golfBrandSchema);

//Set up Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up Method-Override
app.use(methodOverride("_method"));

//HOME PAGE
app.get("/", (req, res)=>{
	res.render("home", {title: 'My Top Brands'});
});

//INDEX ROUTE
app.get("/brands", (req, res)=>{
	Brand.find({}, (err, brand)=>{
		brand = brand.sort((a,b)=> a.rank-b.rank);
		return err ? console.log(err) : res.render("brands", {brands: brand});
	})
});

//NEW ROUTE
app.get("/brands/new", (req, res)=>{
	res.render("newBrand");
});



//CREATE ROUTE --> New brand
app.post("/brands", (req, res)=>{
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
app.get("/brands/:id", (req,res)=>{
	Brand.findById(req.params.id, (err, brand)=>{
		if(err){
			alert("Something went wrong");
			res.redirect("/brand");
		} else {
			res.render("showBrand", {brand: brand});
		}
	});
});

//EDIT UPDATE
app.get("/brands/:id/edit", (req,res)=>{
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
app.put("/brands/:id", (req,res)=>{
	Brand.findByIdAndUpdate(req.params.id, req.body, (err, brand)=>{
		if(err){
			alert("Something went wrong");
			res.redirect("/brand");
		} else {
			if(req.body.comments){
				brand.comments.push(req.body.comments);
			}
			res.redirect("/brands/" + req.params.id);
		}
	});
});



//DESTROY ROUTE
app.delete("/brands/:id",(req,res)=>{
	Brand.findByIdAndRemove(req.params.id, (err,brand)=>{
		if(err){
			console.log(err);
			res.redirect("/brands");
		} else {
			res.redirect("/brands");
		}
	});
});


app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Golf Brands Server is connected");
});






