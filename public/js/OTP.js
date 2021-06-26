const OTP = document.querySelector("#OTP")
const submit = document.querySelector(".submit")


submit.addEventListener('click',()=>{
    error = 0;
    if(!OTP.value)
    {
        error++;
        email.style.borderBottom="solid red"
    } 

    if(!error){
        document.querySelector('form').submit();
    }

})