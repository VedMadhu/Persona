if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

//console.log(process.env.cloudinary_api_key)
//console.log(process.env.cloudinary_api_secret)
//console.log(process.env.cloudinary_api_cloudname)
const methodOverride = require('method-override')
const express = require("express")
const app = express()
const ejsMate = require("ejs-mate")
const path = require("path")
const slash = require("./routes/slash")
const users = require("./routes/users")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const admin = require('./routes/admin')
const passport = require('passport')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
mongoose.connect('mongodb://localhost:27017/Persona',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,    
    useFindAndModify:false

})

const sessionConfig={
    secret:'poor_encryption',
    resave:false,
    saveUninitialized:false
}
app.use(session(sessionConfig))


const initializePassport = require('./passport-config-admin a')

initializePassport(passport);

app.use(passport.initialize())

app.use(passport.session())




const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", ()=>{
    console.log("Database Connected");
})

app.use(express.static(__dirname + '/public/bootstrap'))
app.use(express.static(__dirname + '/public/'));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(flash())




app.use(function(req, res, next){
    //console.log("req.user ", req.user)
    //console.log("All the Sessions"+JSON.stringify(req.session))
    if(!res.locals.message)
    {
    res.locals.message={}

    res.locals.message.couldNotUpdate = req.flash('couldNotUpdate')
    res.locals.message.updateSuccessful = req.flash('updateSuccessful')
    res.locals.message.invalidData =  req.flash('invalidData')
    res.locals.message.productStoredSuccessfully =  req.flash('productStoredSuccessfully')
    res.locals.message.dataNotSaved =  req.flash('dataNotSaved')
    res.locals.message.errorAddCategory = req.flash('errorAddCategory')
    res.locals.message.categoryAdded = req.flash("categoryAdded")
    res.locals.message.loginEmail = req.flash('loginEmail')
    res.locals.message.wrongCredentials=req.flash("wrongCredentials")
    res.locals.message.registrationSuccessful = req.flash('registrationSuccessful')
    res.locals.message.error =req.flash("error")
    res.locals.message.wrongUserInfoSignup=req.flash('wrongUserInfoSignup')
    res.locals.message.emailExistsError=req.flash('emailExistsError')
    res.locals.message.OTPNotSentError = req.flash('OTPNotSentError')
    }else{
    //    console.log("res.locals :: ", res.locals)
    }
    //console.log("All Locals :: ", res.locals)
    //console.log(JSON.stringify(req.session))
    next()
})

// app.get('/fakeuser', async ()=>{
//     user = new User({
//         email:'vedmadhu@gmail.com',
//         full_name:"Ved H Madhu",
//         phone_number:"9106847407"
//     })
//     await User.register(user,"Password")
// })

// app.get('/login_fake', async()=>{
//     user = new User({
//         email:'vedmadhu@gmail.com',
//         full_name:"Ved H Madhu",
//         phone_number:"9106847407"
//     })
//     await User.authenticate(user, "Password")
// })
// app.use((req, res, next)=>{
//     res.cookie('cookie_name', 'useless_cookie'); //Remove this at the end
//     console.log(req.cookies.cookie_name)
//     req.session.session_data1 = 'This is a session Data'
//     console.log(req.session.session_data1)
//     next()
// })


app.use('/admin/random_letters', admin)
app.use("/",slash)
app.use("/users", users)
app.listen(3000, ()=>{
    console.log("Listening  on 3000")
})