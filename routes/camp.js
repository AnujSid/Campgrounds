var express=require("express");
var router=express.Router({mergeParams:true});
var Camp=require("../models/camp");
var Comment=require("../models/comment");
var middleware=require("../middlewares");



router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/addcamp")
})

router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCamp={name:name, image:image, description:description, author:author};
	
    Camp.create(newCamp,function(err,campground){
		if(err){
			console.log("Wrong")
		}
		else{
			req.flash("success","Successfully added a campground");
		    res.redirect("/camp");
		}
	})	
})


router.get("/",function(req,res){
	Camp.find({},function(err,campground){
		if(err){
			console.log("Wrong")
		}
		else{
			res.render("campgrounds/camp",{Camp:campground});
		}
	})	
})

router.get("/:id",function(req,res){
	
	Camp.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show",{camp:foundCamp});
		}
	})
	
})

router.get("/:id/edit", middleware.checkCampOwnership,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
			res.render("campgrounds/edit",{camp:foundCamp});
		})
})

router.put("/:id", middleware.checkCampOwnership, function(req,res){
	Camp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatedCamp){
		if(err){
			console.log(err);
		}else{
			req.flash("success","Successfully edited a campground");
			res.redirect("/camp/"+req.params.id);
		}
	})
})

router.delete("/:id", middleware.checkCampOwnership, function(req,res){
	Camp.findByIdAndRemove(req.params.id,function(err,foundCamp){
		if(err){
			console.log(err);
		}
		else{
			req.flash("error","Successfully deleted a campground");
			res.redirect("/camp");
		}
	})
})



module.exports=router;