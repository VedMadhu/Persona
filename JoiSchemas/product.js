const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi)

const imageSchemaJoi = Joi.object({
    url:Joi.string().uri(),
    fileName:Joi.string().uri()
})

const productSchemaJoi = Joi.object(
    {
        name:Joi.string().regex(/^[0-9a-zA-Z ]+$/).required()
        ,price:Joi.number().min(0)
        ,category:Joi.objectId().required()
        ,description:Joi.string().required().min(10)
    }
).required()


module.exports = {productSchemaJoi, imageSchemaJoi};