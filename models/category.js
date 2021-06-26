const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uniqueCaseInsensitive: true
    },
    max_characters:{
        type:Number,
        min:[0, "number of characters cannot be negative"],
        max:[15, "Number of Characters cannot be more than 50"]
    },
    max_photos:{
        type:Number,
        min:[0,"Number of Photos cannot be negative"],
        max:[15, "Number of Photos cannot be more than 15"]
    },
    tag_words:[{
        type:String,
        max:[10,"tags Cannot be more than 10"]
    }]
})


CategorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category",CategorySchema)

module.exports = Category;