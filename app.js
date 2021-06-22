const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";

let painting = false;
let filling = false;

const startPainting = (e) => {
    painting = true;
};

const onMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

const stopPainting = (e) => {
    painting = false;
};

const onMouseDown = (e) => {
    painting = true;
};

const changeColor = (e) => {
    const {
        target: {
            style: { backgroundColor },
        },
    } = e;
    ctx.strokeStyle = backgroundColor;
};

const changeLineWidth = (e) => {
    const {
        target: { value },
    } = e;
    ctx.lineWidth = value;
};

const changeMode = () => {
    const text = mode.innerText;
    switch (text) {
        case "FILL":
            mode.innerText = "PAINT";
            filling = true;
            break;
        case "PAINT":
            mode.innerHTML = "FILL";
            filling = false;
            break;
    }
};

const changeBackground = (e) => {
    if (filling) {
        // canvas.style.backgroundColor = ctx.strokeStyle;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0, 0, 700, 700);
    }
};

const saveImg = () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
};

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", changeBackground);
}

Array.from(colors).forEach((color) => {
    color.addEventListener("click", changeColor);
});

range.addEventListener("input", changeLineWidth);
mode.addEventListener("click", changeMode);
saveBtn.addEventListener("click", saveImg);
