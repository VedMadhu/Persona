const express = require("express")
const router = express.Router()
const passport = require("passport")
const categorySchemaJoi = require("../JoiSchemas/category")
const Category = require("../models/category")
const Product = require("../models/product")
const multer = require("multer")
const {storage} = require('../cloudinary config/index')
const {cloudinary} = require('../cloudinary config/index')
const addProduct = require('../middlewares/addProduct')
const upload = multer({storage})
router.get('/login', (req, res)=>{
    res.render('admin/admin-login')
})



router.post('/login',(req, res, next)=>{
    console.log(req.body)
    next()
},(req, res,next)=>{
    //console.log("Inside login post")
    passport.authenticate('admin-login', 
    function(err, user, info){
        //console.log(err, user, info)
        if(err){
            //console.log("error generated trying to compare the passport")
            return res.send("Something went wrong trying to log you in")
        }
        //console.log("No error generated")
        if(user)
        {
            req.login(user, function(err){
                if(err)
                {
                    //console.log("Could not Log in")
                }
                //console.log("Logged In")
                return res.redirect('/admin/random_letters/admin-panel')
            })
        }
        else{
            //console.log('User Not Found')
            return res.send('Wrong Credentials, Could not connect')
        }

    })(req, res,next)
})

router.get('/admin-panel',async (req, res, next)=>{
    let categories =await Category.find({}).select("name")
    console.log(categories)
    res.render("admin/index.ejs", {title : "Product Management", categories})
})

router.get('/categories/new', (req, res, next)=>{
    //console.log("New Category to be added")
    res.render("admin/add-category.ejs")
})


router.post('/categories',async (req, res)=>{
    let category = req.body;
    console.log("Inside Categories")
    //console.log(category);
    let {error} = categorySchemaJoi.validate(category)
    console.log(error)
    //console.log("Error in JoiSchema", error)
    if(!error){
        //console.log("No error in Joi Schema")
        category = new Category(category)
        //console.log("Before Await")

        await category.save().then(function(data){
            //console.log({data})
            req.flash("categoryAdded", "Category Added Successfully")
            return res.redirect('/admin/random_letters/admin-panel')
        }).catch(err=>{
            //console.log({err})
            //console.log("Cateogory could not be added :: ", error)
            console.log(err)
            req.flash("errorAddCategory",'could not add to the database :: ')
            return res.redirect('/admin/random_letters/categories/new')    
        })
        //console.log("After Await")
}   
       
} ,function(req, res){
    //console.log("new Category Posted")
})

router.get('/categories/:id', async function(req, res){
    console.log(req.params);
    const {id} = req.params;
    let category = await Category.findOne({_id:id})
    console.log(category)
    console.log(category.name)
    productsOfCategory = await Product.find({category:category._id})
    res.render("admin/category.ejs", {title:(category.name + " Category"), category:category, products:productsOfCategory})
})

router.get('/categories/:category_id/products/new', async function(req, res){
    const {category_id} = req.params
    let form = {}
    console.log("form",form)

    if(req.session.form)
    {
        console.log("form",form)
        form = req.session.form
    }
    console.log("form",form)
    console.log(category_id)
    res.render('admin/add-product.ejs', {title:"Add New Product",category_id, form})
    delete form
})

router.post('/categories/:category_id/products',upload.array('images')
, addProduct.validate, (err,req, res, next)=>{
    images = req.files.map(f=> ({url:f.path, filename:f.filename}))
    deleteFromCloudinary(images, function(){
        console.log('deleted from cloudinary')
    })
    console.log("printing the uploaded images")
    console.log(images);
    console.log("Not Valid Data :: ", error)
    req.flash('invalidData', "Data you added is invalid")
    req.session.form = req.body
    return res.redirect('./new')
}, addProduct.store)

router.get('/products/:id',async (req, res, next)=>{
    const {id} = req.params
    product = Product.findById(id).populate('category').then((data)=>{
    //    console.log(data)
        if(data)
        return res.render("admin/show_product", {product:data})
        return res.send('No Product with that Id')
    }).catch((error)=>{
        res.send('No product with that id ::  '+ error)
    })
})

router.get('/products/:id/edit', async (req, res, next)=>{
//    console.log(req.params.id)
    let id = req.params.id;
    const product = await Product.findById(id)
    const form = product
    const categories = await Category.find({}).select('name')
    const category_id =  product.category
    res.render('admin/edit-product.ejs',  {title:'Edit Product', category_id,categories,id,form})
    console.log("Inside redit-product.ejs")
})

router.patch('/products/:id',addProduct.validate,(err, req, res, next)=>{
    console.log("Error :: Wrong data added");
    console.log(err)
    req.flash('invalidData','Invalid  Data')
    res.redirect('./edit')
},async (req, res)=>{
    let product = req.body
    console.log("Inside Edit Product :: ", product)
    let updatedData = await Product.findByIdAndUpdate(req.params.id, product, 
        {new:true}, function(err,data){
                if(err){
                    req.flash('couldNotUpdate',"Could not update : "+ err.message)
                    console.log("Could not update :: ")
                    res.redirect('./edit')
                }
                else{
                    req.flash('updateSuccessful', "Updated Successfully")
                    console.log("Data :: ", data)
                    res.redirect("../"+data._id)
                }
            })
        })


router.get('/edit_featured_categories',async (req, res)=>{
    let categories = await Category.find({});
    console.log(categories); 
    res.render('admin/edit_featured_categories.ejs', {title:'Select Featured Cateogories', categories});
})

router.patch('/edit_featured_categories', async(req, res)=>{
    let data = req.body;
    console.log(data);
    await Category.updateMany({_id:{$in:data.add}}, {featured:true}).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    });
    await Category.updateMany({_id:{$in:data.delete}}, {featured:false}).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    });;
})

module.exports = router