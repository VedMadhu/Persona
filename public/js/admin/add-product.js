
console.log(validator)

const productName =   document.querySelector("#name")
const price =   document.querySelector("#price")
const description =  document.querySelector("#description")
const submit = document.querySelector("#submit-category")
const form = document.querySelector(".add-category-form")

const nameWarningDescription = document.querySelector(".name-warning-description")
const priceWarningDescription = document.querySelector(".price-warning-description")
const descriptionWarningDescription = document.querySelector(".description-warning-description")

submit.addEventListener("click", function(){
    errors = 0;
    productName.style.borderColor = "#D1D1D1"
    price.style.borderColor = "#D1D1D1"
    description.style.borderColor = "#D1D1D1"
    nameWarningDescription.innerText = ""
    priceWarningDescription.innerText = ""
    descriptionWarningDescription.innerText = ""
    if(!validator.matches(productName.value, '^[0-9a-zA-Z -$&!]+$'))
    {
        errors++;
        productName.style.borderColor = "red"
        nameWarningDescription.innerText="Alphanumeric with atleast 1 character"
    }
    console.log(price.value)
    console.log(parseInt(price.value))
    if(!price.value)
    {
        console.log("Price Error")
        errors++;
        price.style.borderColor = "red"
        priceWarningDescription.innerText = "Required Field"
    }else if(parseInt(price.value) < 0 || !validator.matches(price.value, '^[0-9]{1,9}$')){
        errors++;
        console.log("Price Error 2")
        price.style.borderColor = "red"
        priceWarningDescription.innerText = "Add a non negative number"
    }
    console.log(description.value.length)
    if(description.value.length < 10)
    {
        errors++;
        description.style.borderColor = "red"
        descriptionWarningDescription.innerText = "Atleast 10 Characters"
    }

    if(!errors)
    {
        form.submit()
    }

})


