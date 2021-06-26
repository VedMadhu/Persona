console.log("Script Opened Succesfully");

error = 0;
const submit=document.querySelector(".submit")
const password = document.querySelector("#password")
const username = document.querySelector("#username")


let password_error = document.querySelector('.password-error')
let username_error = document.querySelector('.username-error')


let isPasswordOkey = false;

console.log(
    password_error,
    username_error)


submit.addEventListener('click',()=>{
    error = 0
    console.log(username.value)
    if(!validator.matches(username.value, '^[a-zA-Z0-9_]+$'))
    {
        console.log("Inside username  matches")
        error++;
        username.style.borderBottom="solid red"

        if(username.value)
        {
            console.log("Change Description of Name")
            username_error.innerHTML = "Invalid username"
        }
    }
    else{
        username.style.borderBottom=("solid 1px lightgray")
        username_error.innerHTML=""
    }

    if(!password.value)
    {
        error++;
        password.style.borderBottom="solid red"
    }else{
        password.style.borderBottom=("solid 1px lightgray")
    }
    console.log(error)
    if(!error)
    {
        console.log("Submitting Login Info")
        document.querySelector('form').submit()
    }

})