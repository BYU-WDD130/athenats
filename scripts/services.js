function addService(serviceName){
    // Recuperar array existente o crear uno nuevo
    let selected = JSON.parse(localStorage.getItem("selectedServices")) || [];

    // Evitar duplicados
    if(!selected.includes(serviceName)){
        selected.push(serviceName);
    }

    // Guardar array actualizado
    localStorage.setItem("selectedServices", JSON.stringify(selected));
}

// Función para redirigir al contact.html después de seleccionar un servicio
function goToContact(serviceName){
    // Primero agregamos el servicio
    addService(serviceName);

    // Luego redirigimos al contact.html
    window.location.href = "contact.html";
}
