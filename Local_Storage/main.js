//Select Elements

let allSpans = document.querySelectorAll(".buttons span");
let results = document.querySelector(".results > span");
let theInput = document.getElementById("the-input");

allSpans.forEach(span => {

    span.addEventListener("click", (e) => {

        if(e.target.classList.contains("check-item")){
            checkItem();
        }
        if(e.target.classList.contains("add-item")){
            addItem();
        }
        if(e.target.classList.contains("delete-item")){
            deleteItem();
        }
        if(e.target.classList.contains("show-item")){
            showItem();
        }

    })

});

function checkInput(){

    
        results.innerHTML = "Input can't Be Empty";
        
    

}


function checkItem(){
    if(theInput.value === ""){
        checkInput();
    }
    else if(localStorage.getItem(theInput.value)){

        results.innerHTML = `Found Local Item Called <span>${theInput.value}</span>`;
    } else {

        results.innerHTML = `No Local Storage Item Called <span>${theInput.value}</span>`;

    }

};
function addItem(){

    console.log("add");

};
function deleteItem(){

    console.log("delete");

};
function showItem(){

    console.log("show");

};