console.log("Script Opened Succesfully");

error = 0;
const submit=document.querySelector(".submit")
const password = document.querySelector("#password")
const email = document.querySelector("#email")


let password_error = document.querySelector('.password-error')
let email_error = document.querySelector('.email-error')


let isPasswordOkey = false;

console.log(
    password_error,
    email_error)


submit.addEventListener('click',()=>{
    error = 0
    if(!validator.isEmail(email.value))
    {
        error++;
        email.style.borderBottom="solid red"

        if(email.value)
        {
            console.log("Change Description of Name")
            email_error.innerHTML = "Invalid email"
        }
    }
    else{
        email.style.borderBottom=("solid 1px lightgray")
        email_error=""
    }

    if(!password.value)
    {
        error++;
        password.style.borderBottom = "solid red"
    }
    console.log(error)
    if(!error)
    {
        console.log("Submitting Login Info")
        document.querySelector('form').submit()
    }

})