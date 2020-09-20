var     mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
    
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// campgroundSchema is modelled into Campground to use say Campground.find() //
module.exports = mongoose.model("Campground" , campgroundSchema); //module.exports sends the campgroundSchema to be used elsewhere

