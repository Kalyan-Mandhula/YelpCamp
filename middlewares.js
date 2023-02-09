
let Camp = require("./Model/Camp")
let Review = require("./Model/Review")
let {CampSchemaValidator,ReviewSchemaValidator} = require("./Model/JoiSchema")
let ExpressError = require("./ErrorHandling/ExpressError")

module.exports.isLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) { 
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Login to view Campgrounds');
        return res.redirect('/CampGrounds/login');
    }
    // console.log(req.user["username"])
    next();
}

module.exports.isAuthor = async (req,res,next)=> {
    let {id}=req.params 
    let Obj = await Camp.findById(id)
    if(!(Obj.author.equals(req.user._id))){
        req.flash('error','Sorry you have no permission to delete')
        return res.redirect("/CampGrounds")
    }
    next()
}

module.exports.DataValidator = (req,res,next)=> {
    let {error} = CampSchemaValidator.validate(req.body)
    if(error){
    throw new ExpressError(404,error.details.map(e=>e.message).join(","))
    }else{
        next(error)
    }
}

module.exports.ReviewValidator = (req,res,next)=>{
    let {error} = ReviewSchemaValidator.validate(req.body)
    if(error){
    throw new ExpressError(404,error.details.map(e=>e.message).join(","))
    }else{
        next(error)
    }
}


module.exports.ValidateUserforReview = async(req,res,next)=>{
    let {Reviewid,id}= req.params 
    let obj = await Review.findById(Reviewid).populate('author').populate('user')
    let campobj = await Camp.findById(id)
    if(!( obj.user.equals(req.user._id)) && !(obj.author.equals(req.user._id))){
          req.flash('error',"You can't delete review")
          return res.redirect("/CampGrounds/"+id+"/show")
    }
    next()
}







