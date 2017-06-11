//Set up mongodb and mongoose
var mongoose = require("mongoose");
var Comment = require("./comments");


mongoose.connect("mongodb://localhost/golf_brands_app");
var golfBrandSchema = new mongoose.Schema(
{
	name: String,
	image:{type: String, default: "http://www.orchidislandgolfandbeachclub.com/images/dynamic/getImage.gif?ID=3884041"},
	rank: Number,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	about: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Brand", golfBrandSchema);