const firstName = document.querySelector("#first-name");
    firstName.addEventListener("click", clearStyling);
    firstName.addEventListener("blur", validateInputField);
const lastName = document.querySelector("#last-name");
    lastName.addEventListener("click", clearStyling);
    lastName.addEventListener("blur", validateInputField);
const email = document.querySelector("#email");
    email.addEventListener("click", clearStyling);
    email.addEventListener("blur", validateInputField);
const phoneNumber = document.querySelector("#phone-number");
    // phoneNumber.addEventListener("click", clearStyling);
    phoneNumber.addEventListener("blur", validateInputField);
const password = document.querySelector("#password");
    password.addEventListener("click", validatePassword);
    password.addEventListener("input", validatePassword);
    password.addEventListener("blur", validatePassword);
const confirmPassword = document.querySelector("#confirm-password");



function CheckUserAction(status) {
    this.status = status;
}
    let firstNameStatus = new CheckUserAction(false);
    let lastNameStatus = new CheckUserAction(false);
    let emailStatus = new CheckUserAction(false);
    let phoneNumberStatus = new CheckUserAction(false);
    let passwordStatus = new CheckUserAction(false);
    let confirmPasswordStatus = new CheckUserAction(false);



// const form = document.querySelector("form.create-account");
//     form.addEventListener("submit", validateInput);


function clearStyling() {
        if (this.hasAttribute("class")) {
            this.removeAttribute("class")
        }
    
    this.nextElementSibling.style.display = "none";
}




function validateInputField() {

//Gets the input element id as string and 
//  checks what input field is being validated
    let inputField = `${"#" + this.id}`;  // Id Selector String
    let inputElement = document.querySelector(`${inputField}`);
    let inputFieldName = [];

    let fieldValue = this.value.trim();
    let errorList = document.querySelector(`${inputField} + ul`);
    let errors = [];


// Validation Starts Here
// Validates First Name Input Field
    if (inputField === "#first-name") {
    // Remembers that the user has checked/viewed this input field
        inputFieldName.push(firstNameStatus);
        
        if (fieldValue.length === 0) {
            errors.push("Field is empty. Kindly fill in a valid first name");
        } else if (fieldValue === null) {
            errors.push("Kindly enter a valid first name");
        }
    }

// Validates Last Name Input Field
if (inputField === "#last-name") {
// Remembers that the user has checked/viewed this input field
    inputFieldName.push(lastNameStatus);

    if (fieldValue.length === 0) {
        errors.push("Field is empty. Kindly fill in a valid last name");
    } else if (fieldValue === null) {
        errors.push("Kindly enter a valid last name");
    }
}

// Validates email Input Field
if (inputField === "#email") {
// Remembers that the user has checked/viewed this input field
    inputFieldName.push(emailStatus);

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (fieldValue.length === 0) {
        errors.push("Field is empty. Kindly fill in a valid email address");
    } else if (fieldValue === null) {
        errors.push("Kindly enter a valid email address");
    }

    if (emailRegex.test(fieldValue) === false) {
        if (fieldValue.length != 0) {
            errors.push("Kindly enter a valid email address");
        } 
        errors.push("Make sure it's written like example@email.com")
    }
}

// Validates phone Input Field
if (inputField === "#phone-number") {
// Remembers that the user has checked/viewed this input field
    inputFieldName.push(phoneNumberStatus);

    let phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if (fieldValue.length === 0) {
        errors = [];
    } else if (fieldValue === null) {
        errors.push("Kindly enter a valid phone number");
    } else if (fieldValue.length != 0 && phoneRegex.test(fieldValue) === false) {
        errors.push("Kindly enter a valid phone number");
    }

    if (errors.length != 0) {
        errors.push("Reminder: phone number is optional");
    }
}
 
// Removes error list
    function removeErrorList(field) {

        let newErrorList = document.querySelector(`${field} + ul`);
        let errorListNodes = newErrorList.querySelectorAll("li");
        
        if (errorListNodes.length > 0) {
            for(let i = 0; i < errorListNodes.length; i++) {
                newErrorList.removeChild(errorListNodes[i]);
            }
        }
    }

// Checks if there are any Errors
    if (errors.length > 0) {
    // puts the error Array of string in the error list element
        //removes error list from previous errors first
        removeErrorList(inputField); 

        errors.forEach(message => {
            let errorMessage = document.createElement("li");
            errorMessage.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${message}`
            // errorMessage.textContent = message;
            if (errorMessage.textContent.includes("Reminder")) {
                errorMessage.innerHTML = `<i class="fa-solid fa-exclamation"></i> ${message}`
                errorMessage.classList.add("reminder");
                // Adds styling to reminder;
            }
            errorList.appendChild(errorMessage);
            errorList.style.display = "unset"; // Show error list
        });

        if (inputElement.hasAttribute("class")) {
        // Ensures that there's no current styling then 
        //  add corresponding class for styling
            inputElement.removeAttribute("class");
        }
        inputElement.classList.add("invalid");

    } else if (errors.length === 0) {
        removeErrorList(inputField);

        if (inputElement.hasAttribute("class")) {
        // Ensures that there's no current styling then 
        //  add corresponding class for styling
            inputElement.removeAttribute("class");
        }
        inputElement.classList.add("valid");
    }

    //Adds active input listening that guides user if 
    // they already input in correct format, 
    // only triggers if the user has already checked field before
     
    if (inputFieldName[0]["status"] === false) {
        inputFieldName[0]["status"] = true;
        inputElement.addEventListener("input", validateInputField);
    }

}





let listItemArray = [];
function ListItem(listElement, listIcon) {
    this.listElement = listElement;
    this.listIcon = listIcon;
    this.passed = "neutral";
    listItemArray.push(this);
}

let numberCheck = new ListItem(document.querySelector("[data-check='number']"), 
    document.querySelector("[data-check='number'] i"));
let capitalCheck = new ListItem(document.querySelector("[data-check='capital']"), 
    document.querySelector("[data-check='capital'] i"));
let lowerCheck = new ListItem(document.querySelector("[data-check='lower']"), 
    document.querySelector("[data-check='lower'] i"));
let specialCheck = new ListItem(document.querySelector("[data-check='special-char']"), 
    document.querySelector("[data-check='special-char'] i"));
let lengthCheck = new ListItem(document.querySelector("[data-check='length']"), 
    document.querySelector("[data-check='length'] i"));

// let viewed = false;
function validatePassword(event) {
    let guideList = document.querySelector(".guide");
    guideList.style.display = "unset";

    if (event.type === "click") {
        if (this.hasAttribute("class")) {
            this.removeAttribute("class")
        }
    }

     function promptValidity(validity,object) {
         if (validity === true) {
            object["listIcon"].removeAttribute("class");
            object["listIcon"].classList.add("fa-regular", "fa-circle-check");
            object["listElement"].style.color = "#06FF00";
            object["passed"] = true;

         } else if (validity === "neutral") {
            object["listIcon"].removeAttribute("class");
            object["listIcon"].classList.add("fa-regular", "fa-circle-dot");
            object["listElement"].style.color = "var(--other-font-color)";
            object["passed"] = "neutral";
            
        } else if (validity === false) {
            object["listIcon"].removeAttribute("class");
            object["listIcon"].classList.add("fa-regular", "fa-circle-xmark");
            object["listElement"].style.color = "#FF1700";
            object["passed"] = false;
        }

    }



// Check if password has 1 number
    if (/(?=.*\d)/.test(this.value)) {
        promptValidity(true, numberCheck);
    } else {
        if (event.type === "input" || event.type === "click") {
            promptValidity("neutral", numberCheck);
        } else if (event.type === "blur") {
            promptValidity(false, numberCheck);
        }
    }
    console.log(numberCheck["viewed"]);

// Check if password has 1 capital letter
    if (/(?=.*[A-Z])/.test(this.value)) {
        promptValidity(true, capitalCheck);
    } else {
        if (event.type === "input" || event.type === "click") {
            promptValidity("neutral", capitalCheck);
        } else if (event.type === "blur") {
            promptValidity(false, capitalCheck);
        }
    }

// Check if password has 1 lower case letter
    if (/(?=.*[a-z])/.test(this.value)) {
        promptValidity(true, lowerCheck);
    } else {
        if (event.type === "input" || event.type === "click") {
            promptValidity("neutral", lowerCheck);
        } else if (event.type === "blur") {
            promptValidity(false, lowerCheck);
        }
    }

// Check if password has 1 special character
    if (/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(this.value)) {
        promptValidity(true, specialCheck);
    } else {
        if (event.type === "input" || event.type === "click") {
            promptValidity("neutral", specialCheck);
        } else if (event.type === "blur") {
            promptValidity(false, specialCheck);
        }
    }

// Check if password is at least 8 characters
if (/.{8,}/.test(this.value)) {
    promptValidity(true, lengthCheck);
} else {
    if (event.type === "input" || event.type === "click") {
        promptValidity("neutral", lengthCheck);
    } else if (event.type === "blur") {
        promptValidity(false, lengthCheck);
    }
}

    if (event.type === "blur") {
        let resultsArray = [];

        listItemArray.forEach(item => {
            resultsArray.push(item["passed"]);
        })
    
        if (resultsArray.includes(false) || resultsArray.includes("neutral")) {
            this.classList.add("invalid");
        } else {
            this.classList.add("valid");
            guideList.style.display = "none";
        }

    }
    
}



