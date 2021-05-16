var express=require("express");
var app=express();
var mongoose=require("mongoose");
var flash=require("connect-flash");
var methodOverride=require("method-override");
var bodyParser=require("body-parser");
var Camp=require("./models/camp");
var Comment=require("./models/comment");
var seedDB=require("./seed");
var passport=require("passport");
var localStrategy=require("passport-local").Strategy;
var passportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user");

var indexRoute=require("./routes/index"),
	campRoute=require("./routes/camp"),
    commentRoute=require("./routes/comment");


var url=process.env.DATABASE||"mongodb://localhost:27017/Yelp_camp";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
seedDB();


app.use(require("express-session")({
    	secret:"Rusty is best",
	    resave:false,
	    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
	next();
});

app.use("/camp",campRoute);
app.use("/",indexRoute);
app.use("/camp/:id/comment",commentRoute);


app.get("/",function(req,res){
	res.render("campgrounds/loading");
})


app.listen(process.env.PORT||3000,function(){
	console.log("server started");
})