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
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) =>  response.json())
    .then((repositories) => {
       //Empty the container
       reposData.innerHTML = '';

      //loop on Repositories
      repositories.forEach(repo => {
     
         //create The main div
         let mainDiv = document.createElement('div');

         //create repo name text
         let repoName = document.createTextNode(repo.name);

         mainDiv.appendChild(repoName);

         //create repo url 
         let theUrl = document.createElement('a');

         //create repo url text
         let theUrlText = document.createTextNode("Visit");

         //append the url text
         theUrl.appendChild(theUrlText);
         

         //add the hyper text refrence href
         theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

         //set  attribute blank
         theUrl.setAttribute('target','_blank');

         mainDiv.appendChild(theUrl);

         //create stars count span
         let StarsSpan = document.createElement('span');

         //create  the stars count text
         let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

         StarsSpan.appendChild(starsText);

         mainDiv.appendChild(StarsSpan);

         mainDiv.className = "repo-box";

         //append the main div to container
         reposData.appendChild(mainDiv);

      });

    });
 }

}

