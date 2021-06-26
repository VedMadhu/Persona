const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const Admin = require('./models/admin')
async  function initialize(passport){
    console.log("Inside Authentication in Authenticate Admin")

    const authenticateAdmin = async (username,password, done)=>{
        admin = await Admin.findOne({username:username})
        console.log(password)
        console.log(username, password)
        console.log(admin)
        if(admin == null)
        {
            console.log("No Admin Found")
            return done(null, false, {message:"No Admin with that username"});
        }
        try {
            if(await bcrypt.compare(password, admin.password))
            {
                console.log("Password Matched")
                return done(null, admin)   
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
    passport.use('admin-login',new LocalStrategy({
        usernameField:'username'
    }, authenticateAdmin))

    passport.use('user-login', new LocalStrategy({
        usernameField:'email'}, 
        async function(email, password, done){
            console.log("Starting to Authenticate")
            user =await User.findOne({email:email})
            if(user==null){
                return done(null, false, {message:"wrong password or email"})
            }
            try{
                if(await bcrypt.compare(password, user.password)){
                    console.log("Successful")
                    return done(null, user)
                }   
                else{
                    return done(null, false, {message:"Wrong password or email"})
                }
            }catch(error){
                return done(error)
            }
        }
        
        ))


    passport.serializeUser((user, done)=>{
        //console.log("Inside Serialize User :: user ", user)
        done(null,user.id)
    })

    
    passport.deserializeUser(async (id, done)=>{
        //console.log("Inside Deserialize User :: id - ",id )
        admin =await Admin.findById(id);
        user = await User.findById(id)
        //console.log(admin)
        //console.log(user)
        if(admin)
        {    
        //    console.log("Admin Found")
            done(null,await Admin.findById(id))
        }
        else if(user)
        {
        //   console.log("User found")
            done (null, await User.findById(id))        
        }
    })
}


module.exports = initialize