const express=require("express");
const router=express.Router();
const {ensureAuthenticated}=require("../config/auth");


router.get('/', function(req, res) {
  res.render("welcome.ejs");
});
router.get("/dashboard",ensureAuthenticated,(req,res) =>
  res.render("dashboard",{
    name:req.user.name
  }));

module.exports=router;
