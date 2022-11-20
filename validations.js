function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
} //função para validar o email, retorna verdadeiro ou falso