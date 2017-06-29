var Brand = require("../models/brand");
var middleware = {};

middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


middleware.checkBrandCreator = function(req, res, next){
	if(req.isAuthenticated()){
		Brand.findById(req.params.id, (err, foundBrand)=>{
			if(err){
				res.redirect("back");
			} else {
				if(foundBrand.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect('back');
	}
}


module.exports = middleware;