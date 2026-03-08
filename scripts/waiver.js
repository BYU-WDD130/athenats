emailjs.init("YOUR_USER_ID"); // replace with your EmailJS user ID

// Modal logic
const modal = document.getElementById("waiver-modal");
const openBtn = document.getElementById("open-waiver");
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => { modal.style.display = "block"; }
closeBtn.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; }

// Canvas signature
const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", draw);

function startDraw(e){ drawing = true; ctx.beginPath(); }
function stopDraw(){ drawing = false; }
function draw(e){
    if(!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2; ctx.lineCap = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

document.getElementById("clear").addEventListener("click", ()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); });

// Set date automatically
document.getElementById("date").value = new Date().toLocaleDateString();

// Form submission
document.getElementById("waiverForm").addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        date: document.getElementById("date").value,
        signature: canvas.toDataURL()
    };

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data)
    .then(() => {
        modal.style.display = "none"; // Close modal
        alert("You will be contacted soon.");
    }, (error) => {
        console.error("FAILED...", error);
        alert("There was an error submitting your waiver. Please try again.");
    });


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

});