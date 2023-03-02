const firstName = document.querySelector("#first-name");
    firstName.addEventListener("blur", validateInputField);
    // Note: mousedown event listener is added later in code
    //  to firstName, lastName, email, phoneNumber
const lastName = document.querySelector("#last-name");
    lastName.addEventListener("blur", validateInputField);
const email = document.querySelector("#email");
    email.addEventListener("blur", validateInputField);
const phoneNumber = document.querySelector("#phone");
    phoneNumber.addEventListener("blur", validateInputField);
const password = document.querySelector("#password");
    password.addEventListener("mousedown", validatePassword);
    password.addEventListener("input", validatePassword);
    password.addEventListener("blur", validatePassword);
const confirmPassword = document.querySelector("#confirm-password");
    confirmPassword.addEventListener("mousedown", validateConfirmPassword);
    confirmPassword.addEventListener("input", validateConfirmPassword);
    confirmPassword.addEventListener("blur", validateConfirmPassword);

const form = document.querySelector("form.create-account");
    form.addEventListener("submit", submitForm);

let overAllValidation = []; // Saves status of input fields
function CheckUserAction(name, viewed, inputField) {
    this.name = name;
    this.viewed = viewed;
    this.inputField = inputField;
    this.validity = false;
    overAllValidation.push(this);
}
    let firstNameStatus = new CheckUserAction("firstName", false, firstName);
    let lastNameStatus = new CheckUserAction("lastName", false, lastName);
    let emailStatus = new CheckUserAction("email", false, email);
    let phoneNumberStatus = new CheckUserAction("phoneNumber", false, phoneNumber);
    let passwordStatus = new CheckUserAction("password", false, password);
    let confirmPasswordStatus = new CheckUserAction("confirmPassword", false, confirmPassword);

// Validates Other Input (start) -----------------
//  Clears styling upon click to input field (UI related) 
function clearStyling() {
    if (this.hasAttribute("class")) {
         this.removeAttribute("class")
    }
        
    this.nextElementSibling.style.display = "none";
    return;
    }

function validateInputField() {
//Gets the input element id as string and 
//  checks what input field is being validated
    let inputField = `${"#" + this.id}`;  // Id Selector String
    let inputElement = document.querySelector(`${inputField}`); //(<input>)
    let inputFieldName = []; // Saves the input field currently active

    let fieldValue = this.value.trim(); // Ensures no whitespace
    
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
        errors.push("Reminder: Write it like example@email.com")
    }
}

// Validates phone Input Field
if (inputField === "#phone") {
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

// Checks if there are any Errors

    function removeErrorList(field) { //  (Reusable Function)
        let newErrorList = document.querySelector(`${field} + ul`);
        let errorListNodes = newErrorList.querySelectorAll("li");
        
        if (errorListNodes.length > 0) {
            for(let i = 0; i < errorListNodes.length; i++) {
                newErrorList.removeChild(errorListNodes[i]);
            }
        }
    }

    if (errors.length > 0) {
    // Puts the error Array of string in the error list element(ul > li)
        removeErrorList(inputField); //removes error list from previous errors first

        errors.forEach(message => {
            let errorMessage = document.createElement("li");
            errorMessage.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${message}`

            if (errorMessage.textContent.includes("Reminder")) {
                errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`
                errorMessage.classList.add("reminder");
                // Adds styling to reminder;
            }
            errorList.appendChild(errorMessage);
            errorList.style.display = "unset"; // Show error list
        });

        if (inputElement.hasAttribute("class")) {
        // If statement ensures that there's no current styling then 
        //  add corresponding class for styling
            inputElement.removeAttribute("class");
        }
        inputElement.classList.add("invalid");
        inputFieldName[0]["validity"] = false; // Saves validity to global object
        
    } else if (errors.length === 0) {
        removeErrorList(inputField);

        if (inputElement.hasAttribute("class")) {
        // Ensures that there's no current styling then 
        //  add corresponding class for styling
            inputElement.removeAttribute("class");
        }
        inputElement.classList.add("valid");
        errorList.style.display = "none";
        inputFieldName[0]["validity"] = true; // Saves validity to global object
    }

    // Adds active input listening that guides user if 
    // they already input in correct format, 
    // only triggers if the user has already checked field before
     
    if (inputFieldName[0]["viewed"] === false) {
        inputFieldName[0]["viewed"] = true;
        inputElement.addEventListener("input", validateInputField);
        inputElement.addEventListener("mousedown", clearStyling);
    }
console.log(overAllValidation);
}

// validates Other Input (end) -----------------


// Validates Password (start) -----------
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


function validatePassword(event) {
    let guideList = document.querySelector(".guide");
    guideList.style.display = "unset";

    if (event.type === "mousedown") {
        if (this.hasAttribute("class")) {
            this.removeAttribute("class")
        }
    }

     function promptValidity(validity,object) { // Reusable function
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
        if (event.type === "input" || event.type === "mousedown") {
            promptValidity("neutral", numberCheck);
        } else if (event.type === "blur") {
            promptValidity(false, numberCheck);
        }
    }

// Check if password has 1 capital letter
    if (/(?=.*[A-Z])/.test(this.value)) {
        promptValidity(true, capitalCheck);
    } else {
        if (event.type === "input" || event.type === "mousedown") {
            promptValidity("neutral", capitalCheck);
        } else if (event.type === "blur") {
            promptValidity(false, capitalCheck);
        }
    }

// Check if password has 1 lower case letter
    if (/(?=.*[a-z])/.test(this.value)) {
        promptValidity(true, lowerCheck);
    } else {
        if (event.type === "input" || event.type === "mousedown") {
            promptValidity("neutral", lowerCheck);
        } else if (event.type === "blur") {
            promptValidity(false, lowerCheck);
        }
    }

// Check if password has 1 special character
    if (/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(this.value)) {
        promptValidity(true, specialCheck);
    } else {
        if (event.type === "input" || event.type === "mousedown") {
            promptValidity("neutral", specialCheck);
        } else if (event.type === "blur") {
            promptValidity(false, specialCheck);
        }
    }

// Check if password is at least 8 characters
    if (/.{8,}/.test(this.value)) {
        promptValidity(true, lengthCheck);
    } else {
        if (event.type === "input" || event.type === "mousedown") {
            promptValidity("neutral", lengthCheck);
        } else if (event.type === "blur") {
            promptValidity(false, lengthCheck);
        }
    }

// Checks overall validity of password
    if (event.type === "blur") {
        let resultsArray = []; // Array of results derived from object

        listItemArray.forEach(item => {
            resultsArray.push(item["passed"]);
        });
    
        if (resultsArray.includes(false) || resultsArray.includes("neutral")) {
            this.classList.add("invalid");
            passwordStatus["validity"] = false; // Saves validity to global object
        } else {
            this.classList.add("valid");
            guideList.style.display = "none";
            passwordStatus["validity"] = true;  // Saves validity to global object
        }
    }
    
    console.log(overAllValidation);
}
// Validates Password (end) -----------

// Validates Confirm Password (start) -----------
let confirmInputElement = document.querySelector("[data-check='confirm']");
function validateConfirmPassword(event) {
    let passwordInput = password.value;

    //Add event listener to actively listens to the password input
    if (event.type === "mousedown") {
        password.addEventListener("input", activePassListening);

        if (this.hasAttribute("class")) {
            this.removeAttribute("class")
       }  
       this.nextElementSibling.style.display = "none";
    }

    if (event.type === "blur") {
        if (this.hasAttribute("class")) {
            this.removeAttribute("class")
        }

        if (this.value != passwordInput && this.value.length != 0) {
            confirmInputElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Must match passwords`;
            confirmPasswordStatus["validity"] = false;
            this.classList.add("invalid");
            this.nextElementSibling.style.display = "unset";
        } else if (this.value.length === 0 ) {
            confirmInputElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Enter password`;
            confirmPasswordStatus["validity"] = false;
            this.classList.add("invalid");
            this.nextElementSibling.style.display = "unset";
        }else if (this.value.length != 0 && this.value === passwordInput) {
            confirmInputElement.innerHTML = "";
            this.classList.add("valid");
            confirmPasswordStatus["validity"] = true;
        }
        console.log(this);
    }

function activePassListening() {
    // Removes confirm pass UI, when password is altered
    if (confirmPassword.value != passwordInput) {
        if (confirmPassword.hasAttribute("class")) {
            confirmPassword.removeAttribute("class")
         }
        confirmInputElement.innerHTML = "";
    }
    // No UI changes when password matches during active input, 
    //  so that the user will try to confirm password again
}
console.log(overAllValidation);
}
// Validates Confirm Password (end) -----------


// Validate and Submit (start) ----------------
function submitForm(event) {
    // Construct mouse event to simulates blur event when submit button is clicked.
    // Created to be used for validation on submit button click 
    const blurEvent = new MouseEvent('blur', {
        bubbles: true,
        cancelable: true,
        view: window
    });

    let inputs = document.querySelectorAll("form.create-account input");

    // Simulates blur event to all input fields to validate input values
    inputs.forEach(input => {
        input.dispatchEvent(blurEvent);
    });

    // Checks the saved validations if all inputs values has passed
    let jumpFocus = ""; // Save here the first instance of Error
    overAllValidation.some(validation => {
        if (validation["validity"] === false) {
            event.preventDefault();
            jumpFocus = `${"#" + validation["inputField"].getAttribute("id")}`;
            return true; // Break loop when first instance of error is detected
        }
    });

    let firstInstanceError = document.querySelector(jumpFocus);
    firstInstanceError.scrollIntoView({behavior: "smooth", block: "center"});

}
// Validate and Submit (end) ----------------




















