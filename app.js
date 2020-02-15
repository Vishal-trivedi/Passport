const express=require("express");
const expressLayouts = require("express-ejs-layouts");

const mongoose=require("mongoose");
const flash=require("connect-flash");
const session=require("express-session");
const passport=require("passport");





const app=express();

 require("./config/passport")(passport);
app.use(expressLayouts);
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));


mongoose.connect("mongodb://localhost:27017/passportDB",  { useNewUrlParser: true });

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");
    res.locals.error=req.flash("error");

    next();
});



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use("/",indexRouter);
app.use("/users",userRouter);

  app.listen(3000,function(req,res){
    console.log("server started on port 3000");
  });
