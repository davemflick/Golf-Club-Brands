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
	comments: Array,
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
		return err ? console.log(err) : res.render("brands", {brands: brand});
	})
	
});




app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Golf Brands Server is connected");
});