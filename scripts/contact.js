const params = new URLSearchParams(window.location.search);
const service = params.get("service");

const serviceText = document.getElementById("selected-service");
const serviceField = document.getElementById("serviceField");

if(service){
serviceText.textContent = service;
serviceField.value = service;
}else{
serviceText.textContent = "No service selected";
}


// SHOW FORM AFTER CONFIRMATION

const confirmButton = document.getElementById("confirmService");
const formSection = document.getElementById("form-section");

confirmButton.addEventListener("click", function(){
formSection.style.display = "block";
});


// SIGNATURE PAD

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

if(!drawing) return;

const rect = canvas.getBoundingClientRect();

ctx.lineWidth = 2;
ctx.lineCap = "round";

ctx.lineTo(
e.clientX - rect.left,
e.clientY - rect.top
);

ctx.stroke();

});


// CLEAR SIGNATURE

document.getElementById("clearSignature").addEventListener("click", () => {

ctx.clearRect(0,0,canvas.width,canvas.height);

});


// SAVE SIGNATURE BEFORE SUBMIT

document.querySelector("form").addEventListener("submit", function(){

document.getElementById("signatureData").value = canvas.toDataURL();

});