// 1️⃣ Mostrar servicios seleccionados
// -----------------------------
const selectedServiceText = document.getElementById("selected-service");
const serviceField = document.getElementById("serviceField");

// Recuperar servicios desde localStorage
const selectedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];

if (selectedServices.length > 0) {
    // Mostrar como lista
    selectedServiceText.innerHTML = "<ul>" + selectedServices.map(s => `<li>${s}</li>`).join("") + "</ul>";

    // Pasar al input hidden para enviar al formulario
    serviceField.value = selectedServices.join(", ");
} else {
    selectedServiceText.textContent = "No service selected";
}

// -----------------------------
// 2️⃣ Mostrar formulario al confirmar
// -----------------------------
const confirmButton = document.getElementById("confirmService");
const formSection = document.getElementById("form-section");

confirmButton.addEventListener("click", function() {
    formSection.style.display = "block";
});

// -----------------------------
// 3️⃣ Configurar el canvas para la firma
// -----------------------------
const canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

// -----------------------------
// 4️⃣ Limpiar firma
// -----------------------------
document.getElementById("clearSignature").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// -----------------------------
// 5️⃣ Enviar formulario con mensaje de agradecimiento y redirección
// -----------------------------
const form = document.querySelector("form");
const thankYouModal = document.getElementById("thankYouModal");

form.addEventListener("submit", function(e){
    // Guardar firma en input hidden
    document.getElementById("signatureData").value = canvas.toDataURL();

    // Evitar envío inmediato
    e.preventDefault();

    // Mostrar modal de agradecimiento
    thankYouModal.style.display = "flex";

    // Enviar el formulario después de 1.5s
    setTimeout(() => {
        form.submit();
    }, 1500);

    // Redirigir a index.html después de 4s
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});