# Sign up form

## About
A service sign up for Waryur Helmets, a made up shop that sells biker helmets. This portfolio project showcases creation of a form using HTML and styled with CSS for a web page. This project also emphasizes form validation to allow specific constraints to user inputs, then provide feedback and guide users to fix incorrect entered data. 

*Note: However, this app only run on the client side, hence the action form attribute is not hooked to a back-end.*

## Motivation
Forms are essential part of a site. It connects users to the site by providing input fields/ elements that the users supply data with. Such data will further be used by the site to execute certain logic.

This portfolio project allows me to create interactivity and custom form validation that enhances the experience of users while filling up a form.

## Dev Notes
The page loads with an empty sign up form with input fields that the user can use to enter data. When the user clicks on an input field it is focused, the user can then enter data. Once the user blurs out of the input field or loses focus, the entered data is immediately validated. 

### Validation
The validation for first name and last name only checks for length. If there is no value in the field, it is invalid. 

The validation for email address must pass a specific format rule that consist of a name, @ symbol, mail server and a domain. Not following this constraint will result an error. The custom validation is executed with the help of a regular expression:

```
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
```
Wherein this format will pass:
>example@mail.com

The phone number input is optional. It means that the user can send in an empty phone number data and receive no error. However, if the user tries to enter a phone number, it is validated with a regex:
```
let phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
```
Wherein any of these formats will pass:
- (123) 456-7890
- (123)456-7890
- 123-456-7890
- 1234567890

Validating the password follows common modern rules in the web. The following regular expressions check the password input:

- /^/ - Matches the start of the string
- /(?=.*\d)/ - Positive lookahead assertion for at least one digit
- /(?=.*[A-Z])/ - Positive lookahead assertion for at least one uppercase letter
- /(?=.*[a-z])/ - Positive lookahead assertion for at least one lowercase letter
- /(?=.&ast;[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/ - Positive lookahead assertion for at least one special character
- /.{8,} / - Matches any character (except newline) at least 8 times
- /$/ - Matches the end of the string

If one of these validations fail, the password is not accepted. This advises
the user to create a strong password.

The confirm password input field simply validates if the value entered matches the value entered in the password field.

*Note: I found these regex through research. These are common constraints, so it has been in my notes ever since for future use cases. I still try to dissect it and understand how it works nonetheless.*

The user has to confirm the checkbox of the terms and condition agreement as well.

To reiterate, only the phone number is optional. Thus, the user must fill in the *required* input fields to successfully create a new account. 

### Feedback and guiding UI
As observed, all input fields in this project have custom validations. I purposely scripted this to gain more control over the UI.

When a user initially focuses on an input field, the UI is styled to be subtle. I decided to design it in this way, so that the user feels calm while entering data and not be bombarded with urgent indicators. The feedback only shows up when the user blurs out from the current input field.
I decided for an immediate feedback to prompt the user to not skip and sequentially fill up the form. An immediate feedback should either quickly reward or guide the user to correct the mistake while its hot.

Specifically, when the validation passes, the user is rewarded with a success styling, in this case a green highlight to the input field. A simple indicator should direct the user to move on to the next field.

Meanwhile, failing the validation feedbacks with red highlights then adds guiding messages that the user can follow to pass the validation.
When the user tries to fill up the input field again, I styled it remove the red highlights, this again give the user the feeling of ease while trying to enter data.

Furthermore, when the user tries again to enter another password, the guiding message stays in the UI. This list of guides rewards immediate success feedback whenever the user passes a point in the validation.

### Form Submission
As said, this web page runs only in the client side, no data is sent to any back-end. A preventDefault() method is used for the submit button to prevent sending data. When an account is successfully,the user is redirected to another page for a welcome.  


## Live Preview
This project is available for viewing at [Sign up form](https://makieldeviso.github.io/sign-up-form/)


Credits to images:

[Helmet image](https://sk.pinterest.com/pin/512425263857325426/)

[Helmet-image2](https://www.pinterest.ph/pin/1066368017996818992/)

