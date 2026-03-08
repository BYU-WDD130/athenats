// 1️⃣ Mostrar servicios seleccionados
// -----------------------------
const selectedServiceText = document.getElementById("selected-service");
const serviceField = document.getElementById("serviceField");

// Recuperar servicios desde localStorage
const selectedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];

if (selectedServices.length > 0) {
    selectedServiceText.innerHTML = "<ul>" + selectedServices.map(s => `<li>${s}</li>`).join("") + "</ul>";
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
// 3️⃣ Configurar el canvas para la firma (desktop + móvil)
// -----------------------------
const canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");

let drawing = false;

function getTouchPos(canvas, touchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Desktop
canvas.addEventListener("mousedown", () => {
    drawing = true;
    ctx.beginPath();
});
canvas.addEventListener("mouseup", () => {
    drawing = false;
});
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    ctx.stroke();
});

// Mobile / Touch
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    drawing = true;
    ctx.beginPath();
    const pos = getTouchPos(canvas, e);
    ctx.moveTo(pos.x, pos.y);
});
canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    drawing = false;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!drawing) return;
    const pos = getTouchPos(canvas, e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});

// -----------------------------
// 4️⃣ Limpiar firma
// -----------------------------
document.getElementById("clearSignature").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// -----------------------------
// 5️⃣ Enviar formulario con modal de agradecimiento y redirección
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

    // Enviar formulario después de 1.5 segundos
    setTimeout(() => {
        form.submit();
    }, 1500);

    // Redirigir a index.html después de 4 segundos
    setTimeout(() => {
        window.location.href = "index.html";
    }, 4000);
});