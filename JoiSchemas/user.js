const Joi = require('Joi');

const UserSchemaJoi = Joi.object(
    {
        name:Joi.string().pattern(new RegExp('[a-zA-Z ]+')).required()
        ,phone_number:Joi.string().pattern(new RegExp('[0-9]{10}')).required()
        ,email:Joi.string().pattern(new RegExp 
            ('^[a-zA-Z\.0-9]+@g(oogle)?mail\\.com$')).required()
        ,password:Joi.string().pattern(new RegExp('[a-z A-Z0-9~`!@#$%^&*()_\\-+={[}\\\\\\]|:;"\'<,>.?\\\/]{8,20}')).required()
    }
)
.required()

module.exports = UserSchemaJoi