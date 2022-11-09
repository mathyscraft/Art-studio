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
        draw()
    }
}

let mouseDown = false; // Permet, sur pc, de dire si la souris est enfoncée
document.onmousedown = () => {
    mouseDown = true;
}
document.onmouseup = () => {
    mouseDown = false;
}

// Détection pointeur mobile
document.ontouchmove = (e) => {
    if (mouseDown === true) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;
    }
    mouseX = e.touches[0].clientX + window.pageXOffset;
    mouseY = e.touches[0].clientY + window.pageYOffset;
    draw()
    mouseDown = true; // Permet de montrer que le doigt ne vient pas d'etre posé
}
document.ontouchend = () => {
    mouseDown = false; // Montre que le doigt est relevé
}

// Dessin
let canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth - 20;
canvas.height = document.documentElement.clientHeight - 20;

let ctx = canvas.getContext("2d");
const palette1 = document.getElementById('palette-1');
const palette2 = document.getElementById('palette-2');
const inputWeight = document.getElementById('weight');

let color;
changeColor()
palette1.addEventListener('change', changeColor);
palette2.addEventListener('change', changeColor);

let weight;
changeWeight();
inputWeight.addEventListener('change', changeWeight);

function changeColor() {
    colorFill = palette1.value;
    colorStroke = palette2.value;
}
function changeWeight() {
    weight = inputWeight.value / 5;
    if (weight === 0) {
        weight = 0.5;
    }
}

function draw() {
    if (shapeMode === false) {
        // On actualise la couleur :
        ctx.fillStyle = palette1.value;

        // On trace des cercles au niveau de la souris :
        ctx.beginPath();
        ctx.lineWidth = weight;
        ctx.arc(mouseX, mouseY, weight, 0, 100);
    // Trace des cercles entre les deux positions de la souris connues pour eviter les espaces lacunaires
        if (mouseDown === true) { // Verifie que sur mobile le doigt de vient pas d'etre baissé
            for (i = 0.01; i < 1; i = i + 0.01) {
                ctx.arc((oldMouseX-mouseX)*i+mouseX,(oldMouseY-mouseY)*i+mouseY, weight, 0, 100);
            }
        }
        ctx.fill();
    }
}

function exportImg() {
    let url = document.createElement('a');
    url.href = canvas.toDataURL('image/png');
    url.target = "_blank";
    url.click()
    url.download = 'MyDraw.png';
    url.click()
}



let shapeMode = false;
const rectangleModeButton = document.getElementById('rectangle-mode');
rectangleModeButton.style.backgroundColor = "#f1f1f190"
rectangleModeButton.addEventListener('click', () => {
    shapeMode = !rectangleMode;

    if (shapeMode === true) {
        rectangleModeButton.style.backgroundColor = "#f1f1f1";
        rectangleModeButton.style.border = "3px solid black";
        drawrectangle()
    } else {
        rectangleModeButton.style.backgroundColor = "#f1f1f190"
        rectangleModeButton.style.border = "none";
    }
})

function drawrectangle() {
    let croix = 0;
    const nbrImg = document.getElementsByTagName('img').length
    canvas.addEventListener('click', draw);
canvas.addEventListener('touchend', draw);
function draw() {
        if (croix < 2) {
            document.querySelector('body').appendChild(document.createElement('img'));
            croixImg = document.getElementsByTagName('img')[nbrImg+croix];
            croixImg.src = "croix.svg";
            croixImg.style.position = "absolute";
            croixImg.style.left = mouseX-16+"px"; 
            croixImg.style.top = mouseY-16+"px";
            croixImg.style.zIndex = 2;
            croix++;

            if (croix === 2) {
                ctx.fillStyle = colorFill;
                ctx.strokeStyle = colorStroke;
                ctx.lineWidth = weight;
                let x1 = document.getElementsByTagName('img')[nbrImg].style.left.replace("px", "")- (-16);
                let y1 = document.getElementsByTagName('img')[nbrImg].style.top.replace("px", "")- (-16);
                let x2 = document.getElementsByTagName('img')[nbrImg+1].style.left.replace("px", "") - x1- (-16);
                let y2 = document.getElementsByTagName('img')[nbrImg+1].style.top.replace("px", "") - y1- (-16);
                ctx.fillRect(x1, y1, x2,y2);
                ctx.strokeRect(x1, y1, x2,y2);
                rectangleModeButton.click();
                document.getElementsByTagName('img')[nbrImg+1].remove();
                document.getElementsByTagName('img')[nbrImg].remove();
            }
        }
}
}
