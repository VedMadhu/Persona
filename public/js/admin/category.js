adminFeatureLinks = document.querySelectorAll('.admin-feature-link')
        console.log(adminFeatureLinks)
        for(link of adminFeatureLinks)
        {
                if(link.innerText == 'Product Management')
                {
                        heightlight(link)
                }
        }

isCategoriesSeen=false

let categoriesMenu = document.querySelector(".categories-menu");
let showCategories = document.querySelector(".show-categories");
let button = document.querySelector(".add-new-category")

categoriesMenu.style.transition = "height 10s"
showCategories.addEventListener("click", function (){
    if(!isCategoriesSeen)
    {
        categoriesMenu.style.display = 'flex';
        showCategories.innerText = 'Hide Products'
        isCategoriesSeen = true
    }
    else{
        categoriesMenu.style.display = 'none'
        showCategories.innerText = 'Show Products'
        isCategoriesSeen = false
    }
})

