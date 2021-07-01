const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    }
})

ImageSchema.virtual('view_photo').get(function(){
    if(this.url)
    return this.url.replace('/upload', '/upload/w_300')
    return ""
})


module.exports = {ImageSchema};