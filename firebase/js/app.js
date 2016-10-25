//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2MvGZU6ITjUjAh2gLWxiVLQrM77Df-DU",
    authDomain: "tasks-demo-dc414.firebaseapp.com",
    databaseURL: "https://tasks-demo-dc414.firebaseio.com",
    storageBucket: "tasks-demo-dc414.appspot.com",
    messagingSenderId: "637965063415"
};
firebase.initializeApp(config);

var currentUser; // reference to current user we'll get from FB
var authProvider = new firebase.auth.GithubAuthProvider();

// provide a function that must be called whenever an authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");
var purgeButton = document.querySelector(".btn-purge");

var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault(); //handle locally

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid, //unique identifier
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    tasksRef.push(task);

    taskTitleInput.value = ""; //clear input for next task

    return false;
});

function renderTask(snapshot) {
    var task = snapshot.val();
    var li = document.createElement("li");
    //li.textContent = task.title; 

    var spanTitle = document.createElement("span");spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);


    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow() + " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }    
    
    li.addEventListener("click", function() {
        //console.log("click for " + task.title);
        snapshot.ref.update({
            done: !task.done
        })
    })
    taskList.appendChild(li);
}

function render(snapshot) {
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask)
}

tasksRef.on("value", render);

purgeButton.addEventListener("click", function() {
    //console.log("purge!!!!");
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (task.Snapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        });
    });
});