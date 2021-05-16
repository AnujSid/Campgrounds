var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");


router.get("/register",function(req,res){
	res.render("register");
})

router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.redirect("/register");
		}else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to YelpCamp"+ user.username);
				res.redirect("/camp");
			});
		}
	})
})

router.get("/login",function(req,res){
	res.render("login");
})

router.post("/login",passport.authenticate("local",{
	successRedirect:"/camp",
	failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you Out!!");
	res.redirect("/camp");
})


module.exports=router;