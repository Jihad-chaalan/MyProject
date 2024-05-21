//Main variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");


getButton.onclick = function(){
    getRepos();
};



// Get repos function

function getRepos(){
 if (theInput.value == "") {
    reposData.innerHTML = '<span>Please Write Github Username</span>';
 }else{
    fetch('https://api.github.com/users/elzerowebschool/repos')
    .then((response) =>  response.json())
    .then((data) => {
       //Empty the container
       reposData.innerHTML = '';
    });
 }

}