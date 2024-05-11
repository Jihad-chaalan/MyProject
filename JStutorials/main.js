// get slider items / Array .from [ES6]
var sliderImages = Array.from(document.querySelectorAll(".slider-container img"));

// Get Number of slides
var slidesCount =sliderImages.length;

// Set current slide
var currentSlide =1;

//Slide Number Element
var slideNumberElement = document.getElementById('slide-number');

//previous and next buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');


//Handle click on previous and next Buttons
    nextButton.onclick = nextSlide;
    prevButton.onclick = prevSlide;

 //create main UL element
 var paginationElement = document.createElement('ul');

//Set id on created ul element
paginationElement.setAttribute('id','pagination-ul');

// create list items based on array slides count
for(var i = 1;i <= slidesCount; i++){
    var paginationItem = document.createElement('li');

    paginationItem.setAttribute('data-index', i);

//set item content
paginationItem.appendChild(document.createTextNode(i));

//append items to the main UL list
paginationElement.appendChild(paginationItem);

}

//Add the created Ul element to the page
document.getElementById('indicators').appendChild(paginationElement);

//get  the new created UL
var paginationCreatedUL = document.getElementById('pagination-ul');

var paginationsBullets = Array.from(document.querySelectorAll("#pagination-ul li"));

//Triger the checker function
theChecker();

//Loop through all bullets items
for(var i = 0; i <= paginationsBullets.length ; i++){
    paginationsBullets[i].onclick = function(){
        currentSlide = parseInt(this.getAttribute('data-index'));
        theChecker();
    }
    
}

//function Next Slide
function nextSlide(){
    if (nextButton.classList.contains('disabled')) {
        return false;
   } else {
    currentSlide++;
    theChecker();
   }
}
//function Previous Slide
function prevSlide(){
   if (prevButton.classList.contains('disabled')) {
        return false;
   } else {
    currentSlide--;
    theChecker();
   }
}




//create the  checker function
function theChecker() {

    slideNumberElement.textContent = 'Slide #' + (currentSlide) + ' of ' + (slidesCount);

    removeAllActive();

    sliderImages[currentSlide-1].classList.add('active');

    paginationCreatedUL.children[currentSlide-1].classList.add('active');

    if(currentSlide == 1 ){
        prevButton.classList.add('disabled');
    }
    else {
        prevButton.classList.remove('disabled');
    }
   

    if(currentSlide == slidesCount ){
        nextButton.classList.add('disabled');
    }
    else {
        nextButton.classList.remove('disabled');
    }
   
}

//remove all active classes from images and pagination bullets
function removeAllActive(){
//loop through imgs
    sliderImages.forEach(function(img) {
        img.classList.remove('active');
    });

    paginationsBullets.forEach(function(bullets){
        bullets.classList.remove('active');
    })

}