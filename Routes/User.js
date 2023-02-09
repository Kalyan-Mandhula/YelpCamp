let express = require("express")
let router = express.Router() 
let passport = require("passport")

let User = require("../Model/User")






router.get('/login',(req,res)=>{
    res.render("./LoginForm")
})
router.get("/register",(req,res)=>{
    res.render("./registerForm")
})


router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err) {
            return next(err) ;
        }
        else{
            req.flash('success','Successfully loggedout')
            res.redirect("/")
        }
    })
   
})

router.post("/login",passport.authenticate('local',{failureFlash:true ,failureRedirect:'/CampGrounds/login'}), async(req,res)=>{
    req.flash('success','Welcome back')
    console.log( req.session.returnTo)
    returnUrl =  req.session.returnTo || '/CampGrounds'
    // delete req.session.returnTo
    // console.log(returnUrl)
    res.redirect(returnUrl)

})

router.post("/register",async(req,res)=>{
    try{
    let {email,username,password} = req.body ;
    let obj = new User({email , username})
    let registeredUser = await User.register(obj,password)
    req.login(registeredUser,(err)=>{
        if(err){
           return next(err)
        }
        req.flash('success','Welcome to YelpCamp')
        res.redirect("/CampGrounds")

    })
    
    }catch(e){
        req.flash('error',e.message)
        res.render("./registerForm")
    }

    
})


module.exports = router ;