const Joi = require('Joi');

const categorySchemaJoi = Joi.object(
    {

        name:Joi.string().regex(/^.+$/).required()
        ,number_of_photos:Joi.number().min(0).max(15).required()
        ,number_of_characters:Joi.number().min(0).max(1500).required()
    }
)
.required()

module.exports = categorySchemaJoi