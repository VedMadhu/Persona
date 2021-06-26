const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const User = require("./models/user")

async  function initialize(passport){
    console.log("Inside initialize in passport-config")
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async function(email, password, done){
            console.log("Starting to Authenticate")
            user =await User.findOne({email:email})
            if(user==null){
                return done(null, false, {message:"wrong password or email"})
            }
            try{
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user)
                }   
                else{
                    return done(null, false, {message:"Wrong password or email"})
                }
            }catch(error){
                return done(error)
            }

        })
    )


    passport.serializeUser((user, done)=>{
        (user, done)=>{
            done(null, user.id)
        }
    })
    passport.deserializeUser(async (id, done)=>{
        return done(null, await findById(id))
    })
}
module.exports = initialize