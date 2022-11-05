let mouseX;
let mouseY;
let oldMouseX;
let oldMouseY;
// Détection pointeur pc
document.onmousemove = (e) => {
    oldMouseX = mouseX;
    oldMouseY = mouseY;
    mouseX = e.clientX + window.pageXOffset;
    mouseY = e.clientY + window.pageYOffset;
    if (mouseDown === true) {
        mouseUpped = false; // inutile sur pc donc faux par défaut
        draw()
    }
}

let mouseDown = false; // Permet, sur pc, de dire sur la souris est enfoncée
document.onmousedown = () => {
    mouseDown = true;
}
document.onmouseup = () => {
    mouseDown = false;
}

// Détection pointeur mobile
let mouseUpped = false; // Permet, sur mobile, de dire si le doigt vient d'être levé
document.ontouchmove = (e) => {
    if (mouseUpped === false) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;
    }
    mouseX = e.touches[0].clientX + window.pageXOffset;
    mouseY = e.touches[0].clientY + window.pageYOffset;
    draw()
    mouseUpped = false;
}
document.ontouchend = () => {
    mouseUpped = true;
}

// Dessin
const canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth - 20;
canvas.height = document.documentElement.clientHeight - 20;

const ctx = document.querySelector('canvas').getContext("2d");
const palette = document.querySelector('input[type="color"]');
const inputWeight = document.getElementById('weight');

palette.addEventListener('change', changeColor);
let weight;
changeWeight();
inputWeight.addEventListener('change', changeWeight);

function draw() {
    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.arc(mouseX, mouseY, weight, 0, 100);
// Trace des cercles entre les deux positions de la souris connues pour eviter les espaces lacunaires
    if (mouseUpped === false) { // Si sur mobile, le doigt ne vient pas d'être levé ; faux par defaut sur pc
        for (i = 0.01; i < 1; i = i + 0.01) {
            ctx.arc((oldMouseX-mouseX)*i+mouseX,(oldMouseY-mouseY)*i+mouseY, weight, 0, 100);
        }
    }
    
    // ctx.moveTo(oldMouseX, oldMouseY);
    // ctx.lineTo(mouseX, mouseY)
    // ctx.stroke();
    ctx.fill();
}

function changeColor() {
    ctx.fillStyle = palette.value;
    ctx.strokeStyle = palette.value;
}

function changeWeight() {
    weight = inputWeight.value / 5;
    if (weight === 0) {
        weight = 0.5;
    }
}