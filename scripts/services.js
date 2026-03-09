// Guardar servicios seleccionados
function addService(serviceName){

    let selected = JSON.parse(localStorage.getItem("selectedServices")) || [];

    if(!selected.includes(serviceName)){
        selected.push(serviceName);
    }

    localStorage.setItem("selectedServices", JSON.stringify(selected));
}

// Redirigir a contacto
function goToContact(serviceName){
    addService(serviceName);
    window.location.href = "contact.html";
}

// HAMBURGER MENU
document.addEventListener("DOMContentLoaded", function(){

    const navbutton = document.querySelector('#ham-btn');
    const navBar = document.querySelector('#nav-bar');

    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navBar.classList.toggle('show');
    });

});