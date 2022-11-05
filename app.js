let mouseX;
let mouseY;
let oldMouseX;
let oldMouseY;
document.onmousemove = (e) => {
    oldMouseX = mouseX;
    oldMouseY = mouseY;
    mouseX = e.clientX + window.pageXOffset;
    mouseY = e.clientY + window.pageYOffset;
    draw()
}

let mouseDown = false;
document.onmousedown = () => {
    mouseDown = true;
}

document.onmouseup = () => {
    mouseDown = false;
}


const canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth - 10;
canvas.height = document.documentElement.clientHeight - 10;

const ctx = document.querySelector('canvas').getContext("2d");
const palette = document.querySelector('input[type="color"]');
const inputWeight = document.getElementById('weight');

palette.addEventListener('change', changeColor);
let weight;
changeWeight();
inputWeight.addEventListener('change', changeWeight);

function draw() {
    if (mouseDown === true) {
        ctx.beginPath();
        ctx.lineWidth = weight;
        ctx.arc(mouseX, mouseY, weight, 0, 100);
    // Trace des cercles entre les deux positions de la souris connues pour eviter les espaces lacunaires
        for (i = 0.01; i < 1; i = i + 0.01) {
            ctx.arc((oldMouseX-mouseX)*i+mouseX,(oldMouseY-mouseY)*i+mouseY, weight, 0, 100);
        }
        
        // ctx.moveTo(oldMouseX, oldMouseY);
        // ctx.lineTo(mouseX, mouseY)
        // ctx.stroke();
        ctx.fill();
    }
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

