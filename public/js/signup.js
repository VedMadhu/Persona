console.log("Script Opened Succesfully");

const submit=document.querySelector(".submit")
const full_name= document.querySelector("#name")
const set_password = document.querySelector("#set_password")
const confirm_password = document.querySelector("#confirm_password")
console.log("Hey There Hello")
console.log("Hey There Hello")
console.log(confirm_password)
const phone_number = document.querySelector("#phone_number")
const email = document.querySelector("#email")


let name_error = document.querySelector('.name-error')
let set_password_error = document.querySelector('.set_password-error')
let confirm_password_error= document.querySelector('.confirm_password-error')
let phone_number_error = document.querySelector('.phone_number-error')
let email_error = document.querySelector('.email-error')


let isPasswordOkey = false;

console.log(name_error,
    set_password_error,
    confirm_password_error,
    phone_number_error,
    email_error)

console.log(console.log('[a-z A-Z0-9~`!@#$%^&*()_\\-+={[}\\\\\\]|:;"\'<,>.?\\\/]{8,20}'))

set_password.addEventListener('onchange',()=>{
})

submit.addEventListener('click',()=>{
    error = 0;

    confirm_password_error.innerText = ""

    if(!validator.matches(full_name.value, '[a-zA-Z ]+')){
        error++;
        full_name.style.borderBottom=("solid red")
        if(full_name.value)
        {
            console.log("Change Description of Name")
            name_error.innerHTML = "Invalid Name"
        }
    }
    else{
        full_name.style.borderBottom=("solid 1px lightgray")
    }

    if(!validator.isEmail(email.value))
    {
        error++;
        email.style.borderBottom="solid red"

        if(email.value)
        {
            console.log("Change Description of Name")
            email_error.innerHTML = "Invalid email"
        }
    }    else{
        email.style.borderBottom=("solid 1px lightgray")
        email_error.innerText=""
    }


    if(!validator.isMobilePhone("+91"+phone_number.value))
    {
        error++;
        phone_number.style.borderBottom="solid 2px red"

        if(phone_number.value)
        {
            phone_number_error.innerHTML = "Invalid Phone Number"
            full_name.style.borderBottom=("solid 1px lightgray")

        }

    }    else{
        phone_number.style.borderBottom=("solid 1px lightgray")
        phone_number_error.innerText =  "" 
    }

    if(!validator.matches(set_password.value, '[a-z A-Z0-9~`!@#$%^&*()_\\-+={[}\\\\\\]|:;"\'<,>.?\\\/]{8,20}'))
    {
        error++;
        isPasswordOkey=false;
        console.log("Password Not set correctly")
        set_password.style.borderBottom="solid red"
        confirm_password_error.innerText = ""

        confirm_password.style.borderBottom=("solid 1px lightgray")
    }    else{
        isPasswordOkey=true;
        set_password.style.borderBottom=("solid 1px lightgray")
        confirm_password_error.innerHTML = ""
        full_name.style.borderBottom=("solid 1px lightgray")
    }
    
    if(!confirm_password.value){
        error++;
        confirm_password_error.innerText=""
        confirm_password.style.borderBottom="solid 2px red"        
    }
    else if((confirm_password.value!==set_password.value))
    {
        error++;
        console.log(confirm_password_error)
        if(isPasswordOkey)
        {   confirm_password.style.borderBottom="solid 2px red" 
            confirm_password_error.innerHTML = "Passwords do not match"
        }
    }
    else{
        confirm_password.style.borderBottom=("solid 1px lightgray")
        confirm_password_error.innerHTML = ""
    }

    if(!error){
        document.querySelector('form').submit();
    }
})