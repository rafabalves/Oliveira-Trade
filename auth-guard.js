firebase.auth().onAuthStateChanged(user => {
    if(!user){
        window.location.href = "../../index.html";
    }
}) //Se não existir um usúario logado, redireciona para página de login;