function OnChangeName() {
    const name = formRegister.name().value;
    formRegister.nameInvalidError().style.display = name ? "none" : "block";
    formRegister.name().style.borderColor = name ? "#3c8cec" : "#f73c3c";

    toggleCreateButtonDisable();
}

function OnChangeEmail() {
    const email = formRegister.email().value;
    formRegister.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    formRegister.email().style.borderColor = validateEmail(email) ? "#3c8cec" : "#f73c3c"

    toggleCreateButtonDisable();
}

function OnChangePassword() {
    const password = formRegister.password().value;
    formRegister.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    formRegister.password().style.borderColor = password.length >= 6 ? "#3c8cec" : "#f73c3c";

    validatePasswordMatch();
    toggleCreateButtonDisable();
}

function OnChangeConfirmPassword() {
    validatePasswordMatch();
    toggleCreateButtonDisable();
}

function OnChangeDate() {
    const birthDate = formRegister.birthDate().value;
    formRegister.dateInvalidError().style.display = birthDate ? "none" : "block";
    formRegister.birthDate().style.borderColor = birthDate ? "#3c8cec" : "#f73c3c";

    toggleCreateButtonDisable();
}

function validatePasswordMatch() {
    const password = formRegister.password().value;
    const confirmPassword = formRegister.confirmPassword().value;

    formRegister.passwordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
    formRegister.confirmPassword().style.borderColor = password == confirmPassword ? "#3c8cec" : "#f73c3c";
}

function isFormValid() {
    const email = formRegister.email().value;
    const password = formRegister.password().value;
    const confirmPassword = formRegister.confirmPassword().value;
    const name = formRegister.name().value;
    const birthDate = formRegister.birthDate().value;

    if (!validateEmail(email)) {
        return false;
    } else if (password.length < 6) {
        return false;
    } else if (password != confirmPassword) {
        return false;
    } else if (!name) {
        return false;
    } else if (!birthDate) {
        return false;
    } else {
        return true;
    }
}

function toggleCreateButtonDisable() {
    formRegister.createAccountButton().disabled = !isFormValid();
}

function saveUserData(name, email, birthDate, gender) {
    const userData = {
        name: name,
        email: email,
        birthDate: birthDate,
        gender: gender,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }

    firebase.firestore()
        .collection("userData")
        .add(userData)
        .then(() => {
            hideLoading();
            alert("Conta criada com sucesso!");
            firebase.auth().signOut().then(() => {
                window.location.href = "../../index.html";
            })
        }).catch(() => {
            alert("Erro ao criar a conta!");
        })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Este e-mail já está em uso. Tente outro."
    }
    return error.message;
}

function register(event) {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const birthDate = event.target.elements.birthDate.value;
    const gender = event.target.elements.gender.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        showLoading();
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            saveUserData(name, email, birthDate, gender);
        })
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function SignIn() {
    window.location.href = "../../index.html";
}

const formRegister = {
    name: () => document.getElementById("name"),
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
    confirmPassword: () => document.getElementById("confirm-password"),
    birthDate: () => document.getElementById("birthDate"),
    nameInvalidError: () => document.getElementById("name-invalid-error"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    passwordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    dateInvalidError: () => document.getElementById("date-invalid-error"),
    createAccountButton: () => document.getElementById("create-account-button"),
}