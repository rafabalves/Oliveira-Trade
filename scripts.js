function OnChangeEmail(){
    toggleButtonsDisable();
    toggleEmailErros();
    
}

function OnChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login(){
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(() => {
        hideLoading();
        window.location.href = "./pages/home/home.html";
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error){
    if(error.code == "auth/user-not-found"){
        return "Usuário não encontrado"
    }
    if(error.code == "auth/wrong-password"){
        return "Senha inválida"
    }
    return error.message;
    
}

function register(){
    window.location.href = "./pages/register/register.html";
}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=>{
        hideLoading();
        alert(`E-mail de recuperação enviado com sucesso para ${form.email().value}`);
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
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
    form.email().style.borderColor = validateEmail(email) ? "#3c8cec" : "#f73c3c" 
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.password().style.borderColor = password ? "#3c8cec" : "#f73c3c" 
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