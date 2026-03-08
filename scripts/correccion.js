
const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", draw);

function startDraw(e){
    drawing = true;
    ctx.beginPath();
}
function stopDraw(){ drawing = false; }
function draw(e){
    if(!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

document.getElementById("clear").addEventListener("click", ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

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

    console.log(data);
    alert("Waiver submitted successfully!");
});