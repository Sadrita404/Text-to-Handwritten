const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const inputText = document.getElementById('inputText');
const fontSelect = document.getElementById('fontSelect');
const downloadBtn = document.getElementById('downloadBtn');

canvas.width = 800;
canvas.height = 1000;

function drawText() {
    // Vintage Paper Background Color
    ctx.fillStyle = "#f4f1ea"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Blue Lines (Lightly Faded)
    ctx.strokeStyle = "#d6e0f0";
    ctx.lineWidth = 1;
    for (let i = 80; i < canvas.height; i += 35) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Vertical Red Margin (Faded)
    ctx.strokeStyle = "#f2d7d7";
    ctx.beginPath();
    ctx.moveTo(80, 0);
    ctx.lineTo(80, canvas.height);
    ctx.stroke();

    // Text Logic
    ctx.fillStyle = "#2b2b2b"; // Vintage Dark Grey/Black Ink
    ctx.font = `24px ${fontSelect.value}`;
    
    const x = 100;
    let y = 115; // Starts on the 2nd line
    const lineHeight = 35;
    const maxWidth = 650;

    const words = inputText.value.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

// Listeners
inputText.addEventListener('input', drawText);
fontSelect.addEventListener('change', drawText);

downloadBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0, 595, 842);
    pdf.save("covid_survivor_archive.pdf");
});

document.getElementById('currentDate').innerText = new Date().toDateString().toUpperCase();

// Draw once fonts load
window.onload = () => {
    setTimeout(drawText, 1000);
};