function validateFields(){
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid; 
    //Se o email for valido (verdadeiro), disabled recebe false (!true), ou seja, habilitado

    const passwordValid = isPassWordValid();
    document.getElementById("login-button").disabled = !passwordValid || !emailValid;
    //o botão de login recebe disabled = true (desabilitado) quando passwordValid = false OU emailValid = false
}

function isEmailValid(){
    const email = document.getElementById("email").value;
    /*if(!email){
        return false; 
        //se email = vazio, retorna falso
    }*/
    return validateEmail(email);
}

function isPassWordValid(){
    const password = document.getElementById("password").value;
    if(!password){
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
} //função para validar o email, retorna verdadeiro ou falso
