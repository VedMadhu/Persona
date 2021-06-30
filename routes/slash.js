const express = require("express")
const app = express()
const router = express.Router()
const User = require("../models/user")
const UserSchemaJoi = require("../JoiSchemas/user")
const nodeMailer = require("nodemailer")
const bcrypt = require("bcrypt")
const passport = require("passport")




async function mailOTP(req, res, next){
    console.log("Inside Mail OTP")
    OTP = 100000 + Math.floor( Math.random() * 900000) + ""
    req.OTP = OTP;

    const mailTransporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'personagiftcompany@gmail.com'
            ,pass:"VedVedVed"
        }
    });
    let mailDetails = {
        from: 'personagiftcompany@gmail.com',
        to: req.receiver,
        subject: 'Email Address Confirmation',
        text: 'Use below code to sign up in our site.' + OTP
    };

    
    await mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
            console.log(err)
            req.flash("OTPNotSentError", "Could not send OTP")
        } else {
            console.log('Email sent successfully');
            console.log("Inside send Mail",req.OTP)
            next()  
        }
    });
}

console.log(passport.initialize)


function validateUserInfo(req, res, next){
    console.log("ValidateUserInfo")
    user = req.body.user
    const {error} = UserSchemaJoi.validate(user)
    if(error)
    {   
        console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        req.flash('wrongUserInfoSignup', error.details.map(x => x.message).join(', '))     
        res.redirect('/signup')
    }
    else{
        console.log("Validated")
        user.email = user.email.toLowerCase()
        next()
    }
}

async  function isEmailExist(req, res, next)
{
    console.log("isEmailExist")
    req.receiver = req.body.user.email;
    console.log("req.receiver", req.receiver)
    email = req.body.user.email;
    user = (await User.findOne({email}))
    console.log("After find user by id")
    console.log("User :: ",user)
    if(!(user))
    {
        console.log("Unique Email")
        req.receiver = email;
        next()
    }
    else{
        user = req.body.user;
        delete user.password;
       req.flash('emailExistsError', "This email already registered")
       req.session.signupUserInfo=user

       res.redirect('signup')
    }

}

function storeOTP(req, res, next){
    console.log("Inside Store OTP", req.OTP)
    req.session.signupOTP = req.OTP;
    req.session.signupOTPExpiry = Date.now()/1000 + (3600*2)
    req.session.signupUser = req.body.user;
    next()
}


router.get("/", (req, res)=>{
    console.log("Home Page Opened\n")
    res.render("index")
})
router.get("/signup", function(req, res){
    console.log("signup")
    console.dir("signup user info::"+JSON.stringify(req.session.signupUserInfo))
    if(!req.session.signupUserInfo)
    user = null
    else 
    {
        user = req.session.signupUserInfo
        user.email = ""
    }
    delete req.session.signupUserInfo
    console.log(JSON.stringify(user))
    res.render("signup", {user});
})

router.get("/login", function(req, res){
    //console.log("------------------------------------------")
    //console.log(req.flash('wrongCredentials'))
    if(req.flash('wrongCredentials').length)
    {
        email=req.flash('wrongCredentials')
    }
    else{
        email = ""
    }
 //   console.log(email)
 //   console.log("login")
    res.render("login", {email})
})



router.post("/signup",validateUserInfo,isEmailExist ,mailOTP,storeOTP,(req, res)=>{
    console.log("Signup Post");
    res.render('otp_confirmation');
})

router.use(function(req, res, next){
    console.log("req.body" + JSON.stringify(req.body))
    next()
})
 

router.post('/login',(req, res,next)=>{
    console.log("post login just checkin :: req.body", req.body);
    next()
},(req, res, next)=>{
    passport.authenticate('user-login', function(err, user, info){
        console.log("Authenticate Callback :: ", user)
        if(err)
        {
            return res.send("Server side fault . Could not log you in")
        }
        if(!user)
        {
            return console.log("User not found ", info)
        }

        if(user)
        {

            req.login(user, function(err){
                if(err)
                {
                    console.log("Could not Log in")
                }
                console.log("Logged In")
                return res.redirect('/')
            })
        }
    })(req, res,next)
})

router.get('/get_user', (req, res, next)=>{
    console.log(req.session, req.user)
    res.send("session :: " + JSON.stringify(req.session) + "user :: " +JSON.stringify(req.user))
})

router.post("/otp_confirmation", async (req, res)=>{
    OTP_input = req.body.OTP
    // console.log("OTP  Input = " + OTP_input)
    // console.log("Session OTP " + req.session.signupOTP)
    // console.log("session :: " + req.session.signupOTPExpiry)
    // console.log("Now :: " + Date.now()/1000)
    if(Date.now()/1000 <= (req.session.signupOTPExpiry) )
    {
        console.log("Within Time Limit")
        if(OTP_input == req.session.signupOTP)
        {
            let user = req.session.signupUser;
            password = await bcrypt.hash(user.password, 12);
            console.log("password hash :: " + password);
            user.password = password;
            user = new User(user)
            await user.save()
            console.log(user)
            req.flash('registrationSuccessful',"Registration Successful")
            delete req.session.signupUser
            res.redirect("login");
        }
        else{
            req.flash('wrongOTPError', "Wrong OTP")
            delete req.session.signupUser
            res.locals.message.wrongOTPError = req.flash('wrongOTPError')
            res.render('otp_confirmation')
        }
    }
    else{
        res.send("Time Out")
    }
})

router.get("/categories", (req, res, next)=>{
    res.render('categories.ejs')
})

module.exports = router;