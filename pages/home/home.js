function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("Erro ao fazer logout");
    })
}

const fakeCard = {
    name: "Rafael Alves",
    email: "rafael.balvez@gmail.com",
    birthDate: "1997-10-14",
    gender: "Masculino"
}


function findUserData(){
    addUserDataToScreen(fakeCard);
    
}

function addUserDataToScreen(userData){
    document.getElementById("name").innerHTML = userData.name;
    document.getElementById("email").innerHTML = userData.email;
    document.getElementById("birthDate").innerHTML = formatDate(userData.birthDate);
    document.getElementById("gender").innerHTML = userData.gender;
}

function formatDate(date){
    const splittedDate = date.split("-"); 
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
}

findUserData();

