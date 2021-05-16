var mongoose=require("mongoose");
var Camp=require("./models/camp");
var Comment=require("./models/comment");

var data=[
	{
		name:"Hilly",
		image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  The Extremes of Good and Evil by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance"
	},
	{
		name:"Hilly",
		image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description:"To much fun there"
	},
	{
		name:"Hilly",
		image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description:"To much fun there"
	}
]
 
function seedDB(){
Camp.deleteMany({},function(err){
	if(err){
		console.log(err);
	}else{
	     data.forEach(function(campground){
	Camp.create(campground,function(err,campgr){
			   if(err){
				   console.log(err);
			   }else{
				   Comment.create({
					  author:"Harry",
					  content:"I want to kill Voldemort" 
				   },function(err,comment){
					   if(err){
						   console.log(err);
					   }else{
						   campgr.comments.push(comment);
						   campgr.save();
					   }
				   })
			   }
		   })
		 }
	)}
})};

module.exports=seedDB;