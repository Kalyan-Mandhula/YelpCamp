let mongoose= require("mongoose")

let Camp = require("../Model/Camp")
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://localhost:27017/CampGrounds",{useNewUrlParser: true})
.then(()=>console.log("MONOGOOSE CONNECTED :)"))


let {Cities} = require('./cities')
let {descriptors,places} = require("./titles")


let ObjectMaker = async function(req,res){

    await Camp.deleteMany({})
    for(let i=0;i<50;i++){
    let location = Cities[Math.floor(Math.random()*Cities.length)].city +" "+Cities[Math.floor(Math.random()*Cities.length)].state ;
    let title = descriptors[Math.floor(Math.random()*descriptors.length)]+" "+places[Math.floor(Math.random()*places.length)] ;
    let newObj = new Camp({
            Location : location ,
            Title : title ,
            author : "63d5efc6c71213be5db440fb",
            Image : "https://source.unsplash.com/collection/483251" ,
            Description :"While the getting started pages provide an introductory tour of the project and what it offers, this document focuses on why we do the things we do in Bootstrap. It explains our philosophy to building on the web so that others can learn from us, contribute with us, and help us improve.",
            Price : 20 


    })
    await newObj.save()
    }

}


ObjectMaker()



