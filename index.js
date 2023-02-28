const firstName = document.querySelector("#first-name");
    firstName.addEventListener("blur", validateInputField);
const lastName = document.querySelector("#last-name");
    lastName.addEventListener("blur", validateInputField);
const email = document.querySelector("#email");
    email.addEventListener("blur", validateInputField);
const phoneNumber = document.querySelector("#phone-number");
    phoneNumber.addEventListener("blur", validateInputField);
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");




// const form = document.querySelector("form.create-account");
//     form.addEventListener("submit", validateInput);



function validateInputField() {
//Gets the input element id as string and 
//  checks what input field is being validated
    let inputField = `${"#" + this.id}`;  // Id Selector String
    let inputElement = document.querySelector(`${inputField}`);

    let fieldValue = this.value.trim();
    let errorList = document.querySelector(`${inputField} + ul`);
    let errors = [];


// Validation Starts Here
// Validates First Name Input Field
    if (inputField === "#first-name") {
        if (fieldValue.length === 0) {
            errors.push("Field is empty. Kindly fill in a valid first name");
        } else if (fieldValue === null) {
            errors.push("Kindly enter a valid first name");
        }
    }

// Validates Last Name Input Field
if (inputField === "#last-name") {
    if (fieldValue.length === 0) {
        errors.push("Field is empty. Kindly fill in a valid last name");
    } else if (fieldValue === null) {
        errors.push("Kindly enter a valid last name");
    }
}

// Validates email Input Field
if (inputField === "#email") {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (fieldValue.length === 0) {
        errors.push("Field is empty. Kindly fill in a valid email address");
    } else if (fieldValue === null) {
        errors.push("Kindly enter a valid email address");
    }

    if (emailRegex.test(fieldValue) === false) {
        if (fieldValue.length != 0) {
            errors.push("Kindly enter a valid email address");
        } 
        errors.push("A valid email address looks like this: sample@gmail.com")
    }
}

// Validates email Input Field
if (inputField === "#phone-number") {
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

    console.log(fieldValue);
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
            errorMessage.textContent = message;
            if (errorMessage.textContent.includes("Reminder")) {
                errorMessage.classList.add("reminder");
                // Adds styling to reminder;
            }
            errorList.appendChild(errorMessage);
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
    
}


