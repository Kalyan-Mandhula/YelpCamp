const express=require("express")
let router = express.Router() ;
let Camp = require("../Model/Camp");
let Review = require('../Model/Review')


let {CampSchema} = require("../Model/JoiSchema");

let Joi = require("joi")
let CatchError = require("../ErrorHandling/CatchError")

let methodOverride = require('method-override')

let flash = require("connect-flash")

let {isLoggedIn,isAuthor,DataValidator} = require("../middlewares") 



router.get("/",isLoggedIn,CatchError(async (req,res)=>{
    let List = await Camp.find({})
    res.render("./List",{List})
}))

router.put("/:id/Edit",isLoggedIn,isAuthor,DataValidator,CatchError(async (req,res)=>{
    let {id}=req.params 
    let obj = await Camp.findByIdAndUpdate(id,{...req.body.camp},{new:true})
    req.flash('success','Succesfully Updated') 
    res.redirect(`/CampGrounds/${id}/show`)

}))


router.delete("/:id/delete",isLoggedIn,isAuthor,CatchError(async (req,res)=>{
    let {id}=req.params 
    let campground = await Camp.findByIdAndDelete(id,{new:true})
    await Review.deleteMany({
        _id :{$in :campground.Review}
    })
    req.flash('success','Succesfully Deleted A Camp') 
    res.redirect("/CampGrounds")
}))

router.get("/:id/EditCamp",isLoggedIn,isAuthor,CatchError(async (req,res)=>{
    let {id} = req.params
    let Obj = await Camp.findById(id)
    res.render("./EditCamp" ,{Obj})
}))

router.get("/AddCamp",isLoggedIn,(req,res)=>{
    res.render("./AddForm")
})


router.get("/:id/show",isLoggedIn,CatchError(async (req,res)=>{
    let {id}=req.params
    let List = await Camp.findById(id).populate({
        path :'Review',
        populate :{
            path:'user'
        }
        
    }).populate('author')
    if(!List) {
        req.flash('error','Camp doesnot exist')
        return res.redirect("/CampGrounds")
    } 
    
    res.render("./show",{List})
}))


router.post("/AddCampDetails",isLoggedIn,DataValidator,CatchError(async (req,res)=>{   
    let List = new Camp(req.body.camp)
    List.author= req.user ,
    await List.save()
    req.flash('success','Succesfully added a camp') 
    res.redirect("./"+List._id+"/show")
}))





module.exports = router








