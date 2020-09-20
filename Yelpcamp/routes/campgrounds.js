// ====================================================================================
//                                 CAMPGROUNDS ROUTES
// ====================================================================================
var express = require("express")
var router  = express.Router();

var Campground = require("../models/campground");

var middleware = require("../middleware");

//----------------------------------INDEX -- show all campgrounds
router.get("/" , function(req, res){
    // Get all Campgrounds from DB
    Campground.find({} , function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index" , {campground : allCampgrounds});
        }
    });    
});
// --------------------------------------------------------------


// ----------------------------------POST -- add new campground to DB
router.post("/" , middleware.isLoggedIn, function(req, res){
    // get data from new form page and add to camgrounds array
    var name = req.body.name, img = req.body.image, desc = req.body.description;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newCamp = { name: name , image: img, description: desc, author: author };

    // Create a new campground and save to DB
    Campground.create( newCamp , function(err , newlyCreated){
        if(err){
            console.log(err);
        }
        else{
        // redirect back to campground display page
        res.redirect("/campgrounds");
        }
    });
});
// -------------------------------------------------------------------


//------------------------------------NEW -- form to create new campground
router.get("/new" , middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");        //new.ejs is form to create new campground
});
// ============================================================================


//-----------------------------------SHOW -- shows more info. about user selected campground
router.get("/:id" ,function(req, res){
    // find the campground with provided ID (ID is from user clicked element)
    Campground.findById(req.params.id).populate("comments").exec(function(err , selectedCampground){
        if(err){
            console.log(err);
        } else{
        //render show page 
        res.render("campgrounds/show" , {campground : selectedCampground});
        }
    });
});
// ==============================================================================

// ----------------------------------EDIT -- shows edit form to edit Campground and submits it as PUT request to UPDATE route(below)
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
});

// ----------------------------------UPDATE -- route to update selected campground 
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

// ---------------------------------DESTROY -- route to delete selected campground
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds/");
        } else{
            res.redirect("/campgrounds/");
        }
    });
});


module.exports = router;