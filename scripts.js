function OnChangeEmail(){
    toggleButtonsDisable();
    toggleEmailErros();
    
}

function OnChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login(){
    window.location.href = "./pages/home/home.html";
}

function register(){
    window.location.href = "./pages/register/register.html";
}

function isEmailValid(){
    const email = form.email().value;
    /*if(!email){
        return false; 
        //se email = vazio, retorna falso
    }*/
    return validateEmail(email);
}

function isPassWordValid(){
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;
}

function toggleEmailErros(){
    const email = form.email().value;
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    form.email().style.border = validateEmail(email) ? "1px solid #3c8cec" : "1px solid #f73c3c" 
    form.email().style.outline = validateEmail(email) ? "none" : "1px solid #f73c3c"
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.password().style.border = password ? "1px solid #3c8cec" : "1px solid #f73c3c"
    form.password().style.outline = password ? "none" : "1px solid #f73c3c"
}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid; 
    //Se o email for valido (verdadeiro), disabled recebe false (!true), ou seja, habilitado

    const passwordValid = isPassWordValid();
    form.loginButton().disabled = !passwordValid || !emailValid;
    //o botão de login recebe disabled = true (desabilitado) quando passwordValid = false OU emailValid = false
}

const form = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
    loginButton: () => document.getElementById("login-button"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    passwordRequiredError: () => document.getElementById("password-required-error"),

}