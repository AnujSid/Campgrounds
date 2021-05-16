var mongoose=require("mongoose");


var Camp=mongoose.model("Camp",{
	name:String,
	image:String,
	description:String,
	comments:[{
       type:mongoose.Schema.Types.ObjectId,
	   ref:"Comment"
	}],
    author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
		    href:"User"
		    },
		username:String
	}
});

module.exports=Camp;