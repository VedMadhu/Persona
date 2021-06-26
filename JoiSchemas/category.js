const Joi = require('Joi');

const categorySchemaJoi = Joi.object(
    {

        name:Joi.string().regex(/^[0-9a-zA-Z ]+$/).required()
        ,number_of_photos:Joi.number().min(0).max(15)
        ,number_of_characters:Joi.number().min(0).max(15)
    }
)
.required()

module.exports = categorySchemaJoi