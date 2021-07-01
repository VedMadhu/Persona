const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
const {ImageSchema} = require('./image');

const ProductSchema =new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uniqueCaseInsensitive: true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    description:{
        type:String,
    },
    images:[ImageSchema]
})




ProductSchema.plugin(uniqueValidator);

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product