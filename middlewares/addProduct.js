const Product = require('../models/product')
const productSchemaJoi = require('../JoiSchemas/product')
const {cloudinary}= require('../cloudinary config/index')

async function deleteFromCloudinary(images){
    for(image of images)
    await cloudinary.uploader.destroy(image.filename)
}

const addProduct = {
    store :async (req, res, next)=>{
        product = req.body;
        files = req.files
        product = new Product(product)
        product.images = req.files.map(f=> ({url:f.path, filename:f.filename}))
        await product.save().then((data)=>{
            console.log("Data Stored", data)
            console.log("Uploaded Files, ", req.files)
            req.flash('productStoredSuccessfully', "Product stored successfully")
            res.redirect('../../../products/'+data._id)
        }).catch((error)=>{
            console.log(error)
            req.flash('dataNotSaved', 'Could not save data in database')
            req.session.form = req.body
            deleteFromCloudinary(product.images, function(){
                console.log('deleted from cloudinary')
            })
            res.redirect('./new')
        })
    },

    validate : async (req, res, next)=>{
        console.log("validating")
        const {error, value} = productSchemaJoi.validate(req.body)
        console.log({error},{value})
        if(error){
          next(error)
        }
        else if(value){
            console.log(value)
            next()
        } 
        else{
            console.log("What the hell happened?")
        }
    }
}

module.exports = addProduct
