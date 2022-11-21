function OnChangeEmail(){
    const email = formRegister.email().value;
     formRegister.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    formRegister.email().style.borderColor = validateEmail(email) ? "#3c8cec" : "#f73c3c"

    toggleCreateButtonDisable();
}

function OnChangePassword(){
    const password = formRegister.password().value;
    formRegister.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    formRegister.password().style.borderColor = password.length >= 6 ? "#3c8cec" : "#f73c3c";
    
    validatePasswordMatch(); //Para validar a senha quando ambos os campos são editados
    toggleCreateButtonDisable();
}

function OnChangeConfirmPassword(){
    validatePasswordMatch();//Para validar a senha quando ambos os campos são editados
    toggleCreateButtonDisable();
}

function validatePasswordMatch(){
    const password = formRegister.password().value;
    const confirmPassword = formRegister.confirmPassword().value;
    
    formRegister.passwordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
    formRegister.confirmPassword().style.borderColor = password == confirmPassword ? "#3c8cec" : "#f73c3c";
}

function toggleCreateButtonDisable(){
    formRegister.createAccountButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = formRegister.email().value;
    const password = formRegister.password().value;
    const confirmPassword = formRegister.confirmPassword().value;

    if(!validateEmail(email)){
        return false;
    }else if(password.length < 6){
        return false;
    }else if(password != confirmPassword){
        return false;
    }else{
        return true;
    }

}

const formRegister = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
    confirmPassword: () => document.getElementById("confirm-password"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    passwordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    createAccountButton: () => document.getElementById("create-account-button"),
    
}