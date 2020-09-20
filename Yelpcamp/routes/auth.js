var express = require("express")
var router  = express.Router();

var passport = require("passport");
var User     = require("../models/user")


//---------------------------------------HOMEPAGE--------------------------------------
router.get("/" ,function(req , res){
    res.render("home");
});
// ------------------------------------------------------------------------------------


//                                USER AUTHETICATION ROUTES
// =====================================================================================

//------------------------------------SIGN-UP ROUTE-------------------------------------
router.get("/register", function(req, res){    //show sign up Page
    res.render("register");
});

router.post("/register", function(req, res){     //handle sign up logic
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// -----------------------------------LOGIN ROUTES---------------------------------------
router.get("/login", function(req, res){
    res.render("login");                //render Login page
});

router.post("/login", passport.authenticate("local",   //middleware for Login Logic
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res){              //callback

});

// ----------------------------------LOGOUT ROUTES--------------------------------------
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;