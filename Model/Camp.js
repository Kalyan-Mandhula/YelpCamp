let mongoose = require("mongoose")
let Review = require('./Review')
const User = require("./User")


let CampSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Description:String,
    Location:String,
    Title:String,
    Image:String,
    author : {type : mongoose.Schema.Types.ObjectId,ref:'User'},
    Review: [{type : mongoose.Schema.Types.ObjectId , ref:'Review'}]
})



let Camp = mongoose.model('camp',CampSchema)  

module.exports = Camp

