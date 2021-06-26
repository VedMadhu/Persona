
        let disabledOpacity = 0.5;
        console.log("Hi there Hello")
        slides = document.querySelectorAll(".slide")
        right = document.querySelector(".right")
        left = document.querySelector(".left")
        console.log(slides, right, left)

        counter = 0;
        let maxVisibleItems = 1;
        let endOfItems = slides.length - maxVisibleItems; 
        function disableRight(){
            right.style.opacity = disabledOpacity;
            right.style.pointerEvents = "none";
        }

        function disableLeft(){
            left.style.opacity = disabledOpacity;
            left.style.pointerEvents = "none";
        }

        function enableLeft(){
            left.style.opacity = 1;
            left.style.pointerEvents = "auto";
        }

        disableRight()
        
        leftClicked =  ()=>{
            console.log(counter + "And" + endOfItems)
            if(counter==(endOfItems)){
                console.log("Inside End OF Items");
                counter = 0;
                disableRight()
                for(slide of slides)
                {
                     slide.style.transform = "translateX(0%)";
                     disableLeft();
                     if(slide == slides[slides.length - 1])
                     {
                         slide.addEventListener('transitionend', 
                         function endTransition(){
                            console.log("Inside End Transition of Last");
                            enableLeft();
                            this.removeEventListener("transitionend", endTransition);
                         }                         
                         )
                     }
                }
            }
            else{
            console.log("left Clicked")
        
            for(slide of slides)
            {   
                slide.style.transitionDuration = "0.5s";
                slide.style.transform = "translateX("+ (counter+1)*(-100) +"%)"
                
            }
            console.log(++counter);

            if(counter==1)
            {
                right.style.opacity = 1;
                right.style.pointerEvents = "auto"
            }
        }
        }

        rightClicked = ()=>{
            console.log("right Clicked");
            for(slide of slides)
            {

                slide.style.transform = "translateX("+ (counter-1)*(-100) +"%)"
           
            }
            console.log(--counter);
            if(!(counter))
            disableRight();

        }

        left.addEventListener("click", leftClicked)

        right.addEventListener("click", rightClicked)
        if(slides.length <= 3)
        {
            disableRight()
        }

