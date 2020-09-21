var     express     = require("express");
var     app         = express();
var     bodyParser  = require("body-parser");
var     mongoose    = require("mongoose");
var     passport    = require("passport"); var LocalStrategy = require("passport-local");
var  methodOverride = require("method-override");
// var     passportLocalMongoose = require("passport-local-mongoose");

// ----------------------------MODELS FOR DATABASE---------------------------------------
var Campground = require("./models/campground"); // Yelpcamp/models/campground.js
var Comment = require("./models/comment"); //Yelpcamp/models/comments
var User = require("./models/user"); //Yelpcamp/models/User

//----------------------------Requiring Routes------------------------------------------
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes   = require("./routes/comments");
var authRoutes       = require("./routes/auth");



mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true , useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// ---------------------------PASSPORT CONFIGURATION-------------------------------------
app.use(require("express-session")({
    secret: "Yamaha R6",

    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());     //initialize passport
app.use(passport.session());        //for using passport methods for app to use them
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ---------------------------------------------------------------------------------------

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);



app.listen(3000 , function(){
    console.log("The YelpCamp Server has started"); 
});