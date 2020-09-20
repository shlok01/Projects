var     mongoose = require("mongoose"), 
        passportLocalMongoose = require("passport-local-mongoose"); //adds methods & functionality(login,signup) to UserSchema

var UserSchema = new (mongoose.Schema)({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User" , UserSchema);