//Set up mongodb and mongoose
var mongoose = require("mongoose");
var Comment = require("./comments");


var golfBrandSchema = new mongoose.Schema(
{
	name: String,
	image:{type: String, default: "http://www.orchidislandgolfandbeachclub.com/images/dynamic/getImage.gif?ID=3884041"},
	rank: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	about: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Brand", golfBrandSchema);