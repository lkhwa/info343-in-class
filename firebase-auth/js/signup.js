"use strict";

var signUpForm = document.getElementById("signup-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");
var displayNameInput = document.getElementById("display-name-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    //use Firebase to create a new user
    //with the email and password
    //after the account is created, then use
    //the .updateProfile() method to set the display name

    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function(user) { //called on success
            return user.updateProfile({
                displayName: displayNameInput.value
            });
        })
        .then(function() { //after profile is done
            window.location = "secure.html"; //navigate browser to another url
        })
        .catch(function(err) {
            alert(err.message);
        });

    return false;
});

/*window.prompt to edit messages*/
/* reuse input control */
