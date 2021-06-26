const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const User = require('./models/user')
console.log("Inside Authentication")
async function initialize(passport){

    const authenticateUser = async (email,password, done)=>{
        user = await User.findOne({email:email})
        email = email.toLowerCase()
        console.log("password", password)
        console.log("email", email, password)
        console.log("user", user)
        console.log("inside authenticateUser")
        if(user == null)
        {

            console.log("No User Found")
            return done(null, false, {message:"No user with that email"});
        }
        try {
            console.log("stored password", user.password)
            console.log("added password", password)
            if(await bcrypt.compare(password, user.password))
            {
                console.log("Password Matched")
                return done(null, user)   
            }
            else{
                console.log("Password Incorrect")
                return done(null, false, {message:"Password Incorrect"})
            }
        } catch (error) {
            console.log("Some other error")
            done(null,null ,{message:error})
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done)=>{
        done(null,user.id)
    })
    
    passport.deserializeUser(async (id, done)=>{
        console.log("deserialize :: ", await(User.findById(id)))
        done(null,await User.findById(id))
    })
    console.log("After deserialize User")

}


module.exports = initialize