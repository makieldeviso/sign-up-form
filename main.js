// Verify element then add event listener
function verifyEventAdd(element, event, functionName) {
    if (element != null) {
        element.addEventListener(event, functionName);
    }
}



const firstName = document.querySelector("#first-name");
    // firstName.addEventListener("blur", validateInputField); xxxxxxxxxxx
    verifyEventAdd(firstName, "blur", validateInputField);
    // Note: mousedown event listener is added later in code
    //  to firstName, lastName, email, phoneNumber
const lastName = document.querySelector("#last-name");
    // lastName.addEventListener("blur", validateInputField); xxxxxxxxxxx
    verifyEventAdd(lastName, "blur", validateInputField);


const email = document.querySelector("#email");
    // email.addEventListener("blur", validateInputField); xxxxxxxxx
    verifyEventAdd(email, "blur", validateInputField);

const phoneNumber = document.querySelector("#phone");
    // phoneNumber.addEventListener("blur", validateInputField); xxxxxxxx
    verifyEventAdd(phoneNumber, "blur", validateInputField);


const password = document.querySelector("#password");
    // password.addEventListener("mousedown", validatePassword);
    // password.addEventListener("input", validatePassword);
    // password.addEventListener("blur", validatePassword);

    verifyEventAdd(password, "mousedown", validatePassword);
    verifyEventAdd(password, "input", validatePassword);
    verifyEventAdd(password, "blur", validatePassword);


const confirmPassword = document.querySelector("#confirm-password");
    // confirmPassword.addEventListener("mousedown", validateConfirmPassword);
    // confirmPassword.addEventListener("input", validateConfirmPassword);
    // confirmPassword.addEventListener("blur", validateConfirmPassword);

    verifyEventAdd(confirmPassword, "mousedown", validateConfirmPassword);
    verifyEventAdd(confirmPassword, "input", validateConfirmPassword);
    verifyEventAdd(confirmPassword, "blur", validateConfirmPassword);

const unmaskButton = document.querySelector(`button[data-action="unmask"]`);
const unmaskButtonConfirm = document.querySelector(`button[data-action="unmaskConfirm"]`);

    verifyEventAdd(unmaskButton, "mousedown", unmaskPassword);
    verifyEventAdd(unmaskButtonConfirm, "mousedown", unmaskPassword);


function MaskFlag(name) {
    this.name = name;
    this.status = true;
}

let passMasked = new MaskFlag("passMasked");
let passConfirmMasked = new MaskFlag("passMasked");

function unmaskPassword() {
    

    function mask (maskAction, inputElement, button, flag) {
        if (maskAction === false) {
            inputElement.type = "text";
            button.style.backgroundImage = `url("./images/eye-off.svg")`;
            flag["status"] = false;
        } else if (maskAction === true) {
            inputElement.type = "password";
            button.style.backgroundImage = `url("./images/eye.svg")`;
            flag["status"] = true;
        }
    }

    if (this === unmaskButton && passMasked["status"] === true ) {
        mask(false, password, unmaskButton, passMasked);

    } else if (this === unmaskButton && passMasked["status"] === false) {
        mask(true, password, unmaskButton, passMasked);

    } else if (this === unmaskButtonConfirm && passConfirmMasked["status"] === true) {
        mask(false, confirmPassword , unmaskButtonConfirm, passConfirmMasked);

    } else if (this === unmaskButtonConfirm && passConfirmMasked["status"] === false) {
        mask(true, confirmPassword , unmaskButtonConfirm, passConfirmMasked);
    }

    console.log(passMasked);
}





const terms = document.querySelector("input#terms");
    // terms.addEventListener("change", validatesTerms);
    verifyEventAdd(terms, "change", validatesTerms);
    verifyEventAdd(terms, "blur", validatesTerms);

const form = document.querySelector("form.create-account");
    // form.addEventListener("submit", submitForm);
    verifyEventAdd(form, "submit", submitForm);


const headerBar = document.querySelector("header");
const headerContent = document.querySelector("header ul");
    window.addEventListener("scroll", hideHeader);

// Hides header on scroll down and returns if page is on top;
function hideHeader() {
    if (window.scrollY > 0) {
        headerBar.classList.add("hidden"); 
        headerContent.classList.add("hidden");                     
    } else {  
        headerBar.classList.remove("hidden"); 
        headerContent.classList.remove("hidden");         
    }
}


let overAllValidation = []; // Saves status of input fields
function CheckUserAction(name, inputField) {
    this.name = name;
    this.viewed = false;
    this.inputField = inputField;
    this.validity = false;
    overAllValidation.push(this);
}
    let firstNameStatus = new CheckUserAction("firstName", firstName);
    let lastNameStatus = new CheckUserAction("lastName", lastName);
    let emailStatus = new CheckUserAction("email", email);
    let phoneNumberStatus = new CheckUserAction("phoneNumber", phoneNumber);
    let passwordStatus = new CheckUserAction("password", password);
    let confirmPasswordStatus = new CheckUserAction("confirmPassword", confirmPassword);
    let termsStatus = new CheckUserAction("terms", terms);

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
            this.removeAttribute("class");
            unmaskButton.removeAttribute("class");
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
            unmaskButton.classList.add("invalid");
            passwordStatus["validity"] = false; // Saves validity to global object
        } else {
            this.classList.add("valid");
            unmaskButton.classList.add("valid");
            guideList.style.display = "none";
            passwordStatus["validity"] = true;  // Saves validity to global object
        }
    }
}
// Validates Password (end) -----------

// Validates Confirm Password (start) -----------
let confirmInputElement = document.querySelector("[data-check='confirm']");
function validateConfirmPassword(event) {
    let passwordInput = password.value;
    let thisErrorList = document.querySelector("#confirm-password-error");

    //Add event listener to actively listens to the password input
    if (event.type === "mousedown") {
        password.addEventListener("input", activePassListening);

        if (this.hasAttribute("class")) {
            this.removeAttribute("class");
            unmaskButtonConfirm.removeAttribute("class");
       }  
       thisErrorList.style.display = "none";
    }

    if (event.type === "blur") {
        if (this.hasAttribute("class")) {
            this.removeAttribute("class");
            unmaskButtonConfirm.removeAttribute("class");
        }

        if (this.value != passwordInput && this.value.length != 0) {
            confirmInputElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Must match passwords`;
            confirmPasswordStatus["validity"] = false;
            this.classList.add("invalid");
            unmaskButtonConfirm.classList.add("invalid");

            thisErrorList.style.display = "unset";

        } else if (this.value.length === 0 ) {
            confirmInputElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Enter password`;
            confirmPasswordStatus["validity"] = false;
            this.classList.add("invalid");
            unmaskButtonConfirm.classList.add("invalid");

            thisErrorList.style.display = "unset";
        }else if (this.value.length != 0 && this.value === passwordInput) {
            confirmInputElement.innerHTML = "";
            this.classList.add("valid");
            unmaskButtonConfirm.classList.add("valid");

            confirmPasswordStatus["validity"] = true;
        }
    }

function activePassListening() {
    // Removes confirm pass UI, when password is altered
    if (confirmPassword.value != passwordInput || confirmPassword.value != password.value) {
        if (confirmPassword.hasAttribute("class")) {
            confirmPassword.removeAttribute("class");
            unmaskButtonConfirm.removeAttribute("class");
         }
        confirmInputElement.innerHTML = "";
        confirmInputElement.parentElement.style.display = "none";
    }
    // No UI changes when password matches during active input, 
    //  so that the user will try to confirm password again
}
}
// Validates Confirm Password (end) -----------


// Validates Accept Terms and Conditions (start) ------------
function validatesTerms() {
    let termsError = document.querySelector(`div#terms-div ul`);
    termsError.style.display = "none";

    if (terms.checked) {
        termsStatus["validity"] = true;
    } else {
        termsStatus["validity"] = false;
    }
}

// Validates Accept Terms and Conditions (end) ------------

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

    let submitForm = true;
    // Simulates blur event to all input fields to validate input values
    inputs.forEach(input => {
        input.dispatchEvent(blurEvent);
    });

    // Checks the saved validations if all inputs values has passed
    let jumpFocus = ""; // Save here the first instance of Error
    overAllValidation.some(validation => {
        if (validation["validity"] === false) {
            submitForm = false;
            jumpFocus = `${"#" + validation["inputField"].getAttribute("id")}`;
            return true; // Break loop when first instance of error is detected
        }
    });

    // Adds Error List to Terms if unchecked
    if (termsStatus["validity"] === false) {
        let termsErrorList = document.querySelector(`[data-check="terms-accept"]`); 
        termsErrorList.classList.add("invalid");
        termsErrorList.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Kindly accept the terms and conditions to continue`;
        termsErrorList.parentElement.style.display = "unset";
    }
 
    if (submitForm === false) {
        event.preventDefault(); // stops the form from sending

        // Scrolls to first instance of error
        let firstInstanceError = document.querySelector(jumpFocus);
        firstInstanceError.scrollIntoView({behavior: "smooth", block: "center"});
        return;

    } else if (submitForm === true) {
        event.preventDefault();
        let firstNameValue = firstName.value;
        
        const nextPageURL = `next-page.html?userName=${encodeURIComponent(firstNameValue)}`;
        window.location.href = nextPageURL;
    }
}
// Validate and Submit (end) ----------------




// Next page scripts

// Verify if element exist first before running function
function runElementFunction(element, functionName) {
    if (element != null) {
        functionName();
    }
}

const thanks = document.querySelector("div#thanks");
const thanksSignUp = document.querySelector("div#sign-up");
function animateThanksMessage() {
    setTimeout(()=> {
        thanks.classList.add("still");
        thanksSignUp.classList.add("visible");
        }, 3800);
}

runElementFunction(thanks, animateThanksMessage);

const userName = document.querySelector("span#username");
function printUserName() {
    const urlParams = new URLSearchParams(window.location.search); 
    const definedUserName = String(urlParams.get("userName")).toUpperCase();
    userName.textContent = definedUserName;
}

runElementFunction(userName, printUserName);
