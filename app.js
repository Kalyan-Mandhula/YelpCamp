const express=require("express")
const app = express() ;
const path = require("path")
let mongoose= require("mongoose")

let User = require("./Model/User")
let localStorage = require("passport-local")
let passport = require("passport")


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
let ejsMate = require("ejs-mate")
app.engine('ejs',ejsMate)



let methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.json());

app.use(express.urlencoded({extended:true}))

let CampGround = require("./Routes/CampGround")
let ReviewRoute = require("./Routes/Review")
let UserRoute = require("./Routes/User")

mongoose.set('strictQuery',true);
mongoose.connect("mongodb://localhost:27017/CampGrounds",{useNewUrlParser: true})
.then(()=>console.log("MONOGOOSE CONNECTED :)"))




let session = require("express-session")

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
  

let flash = require("connect-flash");
const CatchError = require("./ErrorHandling/CatchError");
app.use(flash())






app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStorage(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.CurrentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.use("/CampGrounds",CampGround)


app.use("/CampGrounds",ReviewRoute)


app.use("/CampGrounds",UserRoute)







app.get("/",(req,res)=>{
    res.render("./Home")
})

app.listen(3002,()=>{
    console.log("SERVER STARTED !!!")
})

app.use((err,req,res,next)=>{
    let {statusCode=404,message="Something"} = err ;
    res.status(statusCode).render("./BootStrap/ErrorTemplate",{err})
})

