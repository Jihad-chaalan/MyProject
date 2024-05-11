//Setting Up Variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".task-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

//Focus on Input Field
window.onload =function () {
    theInput.focus();
};



// Function to check for repeated tasks
// function isTaskRepeated(taskText) {
//     let existingTasks = Array.from(document.querySelectorAll('.task-box'));
//     for (let task of existingTasks) {
//         console.log("Task Text Content:", task.textContent.trim());
//         console.log("Input Text:", taskText.trim());
//         if (task.textContent.trim() === taskText.trim()) {
//             return true; // Task is repeated
//         }
//     }
//     return false; // Task is not repeated
// }
function isTaskRepeated(taskText) {
    let existingTasks = Array.from(document.querySelectorAll('.task-box'));
    for (let task of existingTasks) {
        let taskTextNode = task.firstChild; // Get the first child node (task text node)
        if (taskTextNode.nodeType !== Node.TEXT_NODE) { // Check if it's a text node
            continue; // Skip if it's not a text node (e.g., delete button)
        }
        if (taskTextNode.textContent.trim() === taskText.trim()) {
            return true; // Task is repeated
        }
    }
    return false; // Task is not repeated
}


//Adding The task
theAddButton.onclick = function (){

    if (!(document.body.contains(document.querySelector('.no-tasks-message')))) {
        
         // Check if the task is already present
         if (isTaskRepeated(theInput.value)) {
            Swal.fire({
                title: 'Repeated Value',
                text: 'Please check your task',
                position: 'top',
                icon: 'warning'
            });
            return; // Exit the function if the task is repeated
        }  
}
    if (theInput.value === '') {
        // console.log("NO Value");
        // Swal.fire({
        //     title: 'Empty Value',
        //     text: 'Please enter your task',
        //     icon: 'warning',
        //     showCancelButton: false,
        //     confirmButtonText: 'OK',
        //   });
        Swal.fire({
            title: 'Empty Value',
            text: 'Please enter your task',
            position: 'top',
            icon: 'warning'

          });
          
          

    } else {

        let noTaskMsg = document.querySelector(".no-tasks-message");

        if (document.body.contains(document.querySelector('.no-tasks-message'))) {
                  //Remove No Tasks message
            noTaskMsg.remove();
        }


        //create span element
        let mainSpan = document.createElement("span");

        //create delete button
        let deleteElement = document.createElement("span");
        
        //create the span text
        let text = document.createTextNode(theInput.value);

        //create the delete button text
        let deletetext = document.createTextNode("Delete");

        // Add textto span
        mainSpan.appendChild(text);

        //Add class to span
        mainSpan.className = 'task-box';

        //add text to delete button
        deleteElement.appendChild(deletetext);

        deleteElement.className = 'delete';

        //add delete button to main span
        mainSpan.appendChild(deleteElement);

        //add the task to the container
        tasksContainer.appendChild(mainSpan);

        //empty the input
        theInput.value ="";


        theInput.focus();

        calculateTasks()

    }
};

document.addEventListener('click' , function(e){
    //Delete Task
    if (e.target.className == 'delete') {
        //REMOVE CURRENT TASK
        e.target.parentNode.remove();

        if(tasksContainer.childElementCount == 0){
            createNoTasks();
        }
    }

    //FINISH THE TASK
    if (e.target.classList.contains('task-box')) {
        //Toggle class 'finished'
        e.target.classList.toggle("finished");
    }

    calculateTasks();

});

//Function To create  No tasks Message
function createNoTasks(){

    //Create Message Span ELement
    let msgSpan = document.createElement("span");

    //Create the Text Message
    let msgText = document.createTextNode("No Tasks To show");

    //Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    //add Class To Message Span
    msgSpan.className = 'no-tasks-message';

    tasksContainer.appendChild(msgSpan);
}


//Function To Calculate tasks

function calculateTasks() {
    //calculate ALL tasks
    tasksCount.innerHTML = document.querySelectorAll('.task-content .task-box').length;
    //calculate completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll('.task-content .finished').length;

}