function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("Erro ao fazer logout");
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        findUserData(user);
    }
})

function findUserData(user) {
    firebase.firestore()
        .collection('userData')
        .where("user.uid", "==", user.uid)
        .get()
        .then(snapshot => {
            const userData = snapshot.docs.map(doc => doc.data());
            addUserDataToScreen(userData[0]);
        })

}

function addUserDataToScreen(userData) {
    document.getElementById("name").innerHTML = userData.name;
    document.getElementById("email").innerHTML = userData.email;
    document.getElementById("birthDate").innerHTML = formatDate(userData.birthDate);
    document.getElementById("gender").innerHTML = userData.gender;
}

function formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
}


