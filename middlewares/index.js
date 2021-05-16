var middlewareObj={};
var Camp=require("../models/camp");
var Comment=require("../models/comment");

middlewareObj.checkCommentOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(foundComment.author.id.equals(req.user.id)){
				next();
			}else{
				req.flash("error","You don't have permission");
				res.redirect("back");
			}
		})
	}else{
		req.flash("error","Please login first!!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error","Please login first!!");
		res.redirect("/login");
	}
}

middlewareObj.checkCampOwnership= function(req,res,next){
	if(req.isAuthenticated()){
		Camp.findById(req.params.id,function(err,foundCamp){
		 if(foundCamp.author.id.equals(req.user.id)){
			 next();
		 }
	     else{
			 req.flash("error","You don't have permission");
			 res.redirect("back");
		 }
		})
    }
	else{
		req.flash("error","Please login first!!");
		res.redirect("/login");
	}
}
	

module.exports=middlewareObj;