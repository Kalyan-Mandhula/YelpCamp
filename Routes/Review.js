
const express=require("express")
let Reviewrouter = express.Router() ;
let Camp = require("../Model/Camp");
let Review = require('../Model/Review')

let {ReviewSchema} = require("../Model/JoiSchema");

let Joi = require("joi")
let CatchError = require("../ErrorHandling/CatchError")
let ExpressError = require("../ErrorHandling/ExpressError")
let methodOverride = require('method-override')


let {isLoggedIn,ReviewValidator,ValidateUserforReview} = require("../middlewares") 



Reviewrouter.delete("/:Reviewid/DeleteReview/:id",ValidateUserforReview,CatchError(async(req,res)=>{
    let {Reviewid,id}= req.params 
    let List = await Camp.findByIdAndUpdate(id,{ $pull:{ Review:Reviewid } , new:true }).populate('Review')
    await Review.findByIdAndDelete(Reviewid)
    await List.save()
    // req.flash('success','Succesfully Deleted') 
    res.redirect("/CampGrounds/"+List._id+"/show")
}))


Reviewrouter.post("/:id/AddReview" ,isLoggedIn, ReviewValidator, CatchError(async (req,res)=>{
    let {id} = req.params 
    List = await Camp.findById(id).populate('Review')
    let newReview = new Review(req.body.review)
    newReview.user = req.user 
    newReview.author = List.author
    List.Review.push(newReview)
    await newReview.save()
    await List.save()
    // console.log(newReview.user.username)
    // req.flash('success','Succesfully added a Review') 
    res.redirect("/CampGrounds/"+List._id+"/show")
}))


module.exports=Reviewrouter
