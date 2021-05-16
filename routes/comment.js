var express=require("express");
var router=express.Router({mergeParams:true});
var Camp=require("../models/camp");
var Comment=require("../models/comment");
var middleware=require("../middlewares");


router.get("/new",middleware.isLoggedIn,function(req,res){
	Camp.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
		    res.render("comments/new",{camp:camp});	
		}
	})
})

router.post("/",middleware.isLoggedIn,function(req,res){
	 Camp.findById(req.params.id,function(err,camp){
		 if(err){
			 console.log(err);
		 }else{
			 Comment.create(req.body.comment,function(err,comment){
				 comment.author.id=req.user.id;
				 comment.author.username=req.user.username;
				 comment.save();
				 camp.comments.push(comment);
				 camp.save();
				 req.flash("success","Successfully added a comment");
				 res.redirect("/camp/"+camp._id);
			 })
		 }
	 })
})

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
		}else{
	        res.render("comments/edit",{camp_id:req.params.id, comment:foundComment});			
		}
	})
})

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
		}else{
			req.flash("success","Successfully edited a comment");
			res.redirect("/camp/"+req.params.id);
		}
	})
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
		if(err){
			console.log(err);
		}else{
			req.flash("error","Successfully deleted a comment");
			res.redirect("/camp/"+req.params.id);
		}
	})
})



module.exports=router;