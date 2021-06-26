const mongoose = require("mongoose");
const Admin = require('./models/admin')
const bcrypt = require('bcrypt')
mongoose.connect('mongodb://localhost:27017/Persona',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true  
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", ()=>{
    console.log("Database Connected");
})

Admin.deleteMany({}).then(function(){
    console.log("collection emptied")
}).catch(function(error)
{
    console.log("Error : ", error)
})

password = "iamroottheadmin"
password = bcrypt.hash(password, 11, function(err, hash) {
    console.log({err})
    console.log({hash})
    admin = new Admin({
        username:"root",
        password:hash
    })
    
    admin.save(admin).then(savedDoc=>{
        console.log(savedDoc)
    }).catch(error=>{
        console.log(error)
    })
});

