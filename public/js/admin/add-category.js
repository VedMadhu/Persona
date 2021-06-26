
console.log(validator)

const categoryName =   document.querySelector("#name")
const maxCharacters =   document.querySelector("#number_of_photos")
const maxPhotos =  document.querySelector("#number_of_characters")
const submit = document.querySelector("#submit-category")
const form = document.querySelector(".add-category-form")
submit.addEventListener("click", function(){
    errors = 0;
    categoryName.style.borderColor = "#D1D1D1"
    maxCharacters.style.borderColor = "#D1D1D1"
    maxPhotos.style.borderColor = "#D1D1D1"

    if(!validator.isAlphanumeric(categoryName.value))
    {
        errors++;
        categoryName.style.borderColor = "red"
    }

    if(!validator.matches(maxCharacters.value, '^[0-9]{0,2}$'))
    {
        errors++;
        maxCharacters.style.borderColor = "red"
    }else if(parseInt(maxCharacters.value)>15 ){
        errors++;
        maxCharacters.placeHolder="Between 0 to 15"
        maxCharacters.style.borderColor = "red"
    }

    if(!validator.matches(maxPhotos.value, '^[0-9]{0,2}$'))
    {
        errors++;
        maxPhotos.style.borderColor = "red"
    }else if(parseInt(maxPhotos.value)>15 ){
        errors++;
        maxPhotos.placeHolder="Between 0 to 15"
        maxPhotos.style.borderColor = "red"
    }

    if(!errors)
    {
        form.submit()
    }

})


