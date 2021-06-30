
console.log(validator)

const categoryName =   document.querySelector("#name")
const maxCharacters =   document.querySelector("#number_of_characters")
const maxPhotos =  document.querySelector("#number_of_photos")
const submit = document.querySelector("#submit-category")
const form = document.querySelector(".add-category-form")

submit.addEventListener("click", function(){

    errors = 0;
    categoryName.style.borderColor = "#D1D1D1"
    maxCharacters.style.borderColor = "#D1D1D1"
    maxPhotos.style.borderColor = "#D1D1D1"

    if(!validator.isLength(categoryName.value))
    {
        errors++;
        categoryName.style.borderColor = "red"
    }

    if(!validator.matches(maxCharacters.value, '^[0-9]+$'))
    {
        errors++;
        maxCharacters.style.borderColor = "red"
        console.log("We are here");
    }else if(parseInt(maxCharacters.value)>1500 ){
        errors++;
        console.log("We are not here");
        maxCharacters.placeholder="Between 0 to 1500"
        maxCharacters.value="";
        maxCharacters.style.borderColor = "red"
    }

    if(!validator.matches(maxPhotos.value, '^[0-9]+$'))
    {
        errors++;
        maxPhotos.style.borderColor = "red"
    }else if(parseInt(maxPhotos.value)>15 ){
        errors++;
        maxPhotos.value=""
        maxPhotos.placeholder="Between 0 to 15"
        maxPhotos.style.borderColor = "red"
    }

    if(!errors)
    {
        form.submit()
    }

})


