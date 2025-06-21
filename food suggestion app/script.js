const colorCodes = [
    { color: 'Black', value: 0, multiplier: 1, hex: '#000000' },
    { color: 'Brown', value: 1, multiplier: 10, tolerance: '±1%', hex: '#8B4513' },
    { color: 'Red', value: 2, multiplier: 100, tolerance: '±2%', hex: '#FF0000' },
    { color: 'Orange', value: 3, multiplier: 1000, hex: '#FFA500' },
    { color: 'Yellow', value: 4, multiplier: 10000, hex: '#FFFF00' },
    { color: 'Green', value: 5, multiplier: 100000, tolerance: '±0.5%', hex: '#008000' },
    { color: 'Blue', value: 6, multiplier: 1000000, tolerance: '±0.25%', hex: '#0000FF' },
    { color: 'Violet', value: 7, multiplier: 10000000, tolerance: '±0.1%', hex: '#8F00FF' },
    { color: 'Gray', value: 8, multiplier: 100000000, tolerance: '±0.05%', hex: '#808080' },
    { color: 'White', value: 9, multiplier: 1000000000, hex: '#FFFFFF' },
    { color: 'Gold', multiplier: 0.1, tolerance: '±5%', hex: '#FFD700' },
    { color: 'Silver', multiplier: 0.01, tolerance: '±10%', hex: '#C0C0C0' }
];

function populateDropdown(id, options) {
    const select = document.getElementById(id);
    options.forEach(opt => {
        const option = document.createElement('option');
        option.text = opt.color;
        option.value = JSON.stringify(opt);
        option.style.backgroundColor = opt.hex;
        select.add(option);
    });
}

function drawResistor(b1, b2, mul, tol) {
    const canvas = document.getElementById('resistorCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Resistor body
    ctx.fillStyle = "#E0B974";
    ctx.fillRect(50, 40, 200, 20);

    // Band positions
    const bandPositions = [60, 90, 120, 150];
    const colors = [b1.hex, b2.hex, mul.hex, tol.hex];

    colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(bandPositions[i], 35, 10, 30);
    });
}

function calculateResistance() {
    const band1 = JSON.parse(document.getElementById('band1').value);
    const band2 = JSON.parse(document.getElementById('band2').value);
    const multiplier = JSON.parse(document.getElementById('multiplier').value);
    const tolerance = JSON.parse(document.getElementById('tolerance').value);

    const value = ((band1.value * 10) + band2.value) * multiplier.multiplier;
    const formatted = value >= 1e6 ? (value / 1e6).toFixed(2) + " MΩ"
                   : value >= 1e3 ? (value / 1e3).toFixed(2) + " kΩ"
                   : value + " Ω";

    document.getElementById('result').innerText = `Resistance: ${formatted} ${tolerance.tolerance || ''}`;
    drawResistor(band1, band2, multiplier, tolerance);
}

populateDropdown("band1", colorCodes.slice(0, 10));
populateDropdown("band2", colorCodes.slice(0, 10));
populateDropdown("multiplier", colorCodes);
populateDropdown("tolerance", colorCodes.filter(c => c.tolerance));

document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", calculateResistance);
});

calculateResistance();
