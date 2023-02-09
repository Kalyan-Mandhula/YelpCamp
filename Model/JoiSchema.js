
let Joi = require("joi")


module.exports.CampSchemaValidator = Joi.object({
    camp : Joi.object({
        Title : Joi.string().required() ,
        Location:Joi.string().required(),
        Image : Joi.string().required() ,
        Description:Joi.string().required(),
        Price:Joi.number().required()
    }).required() 
})

module.exports.ReviewSchemaValidator = Joi.object({
    review :Joi.object({
        Comment :Joi.string().required(),
        Rating :Joi.number().required()
    }).required()
})


