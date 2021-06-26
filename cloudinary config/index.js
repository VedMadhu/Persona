const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.cloudinary_api_cloudname,
    api_key : process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret
})

const storage = new CloudinaryStorage({
    cloudinary ,
    params:{
        folder:'Persona', 
        allowedFormats:['png','jpg', 'jpeg']
    }
})

module.exports = {cloudinary, storage}