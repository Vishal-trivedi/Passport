const express=require("express");
const router=express.Router();
const User = require("../models/Users");

const bcrypt = require("bcrypt");
const passport=require("passport");

router.get('/login', function(req, res) {
  res.render("login");
});

router.get('/register', function(req, res) {
  res.render("register");
});
router.post("/register",function(req,res){
const {name,email,password,password2}= req.body;
let errors=[];

if(!name || !email || !password || !password2)
{
  errors.push({msg:"plz fill in all fields"});

}

if(password.length<6){
  errors.push({msg:"Password too short"});
}
if(password!==password2)
{
  errors.push({msg:"Password do not match"});
}
if(errors.length>0){
  res.render("register",{
    errors,
    name,
    email,
    password,
    password2

  });
}
else {
  User.findOne({email:email })
  .then(user =>{
       if(user){
         errors.push({msg: "slug already exists"});
         res.render("register",{
           errors,
           name,
           email,
           password,
           password2

         });
}



       else {
               const newUser = new User({
                 name,
                 email,
                 password
               });

               bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash) {
     if(err){
       console.log(err);
     }
     newUser.password=hash;
     newUser.save()
          .then(user=>{
           req.flash("success_msg", "you are now registered and can login");
            res.redirect("/users/login");
     });


 });
});


}
});
}
});




router.post("/login",(req,res,next) => {

  passport.authenticate('local', {
    successRedirect:"/dashboard",
    failureRedirect:"/users/login",
    failureflash:true
  })(req,res,next);

});
router.get("/logout",(req,res)=>
{
  req.logout();
  req.flash("success_msg","you are logged out");
  res.redirect("/users/login");
});




module.exports = router;
