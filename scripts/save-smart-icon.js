const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

async function createSmartIcon() {
  try {
    // Define canvas dimensions
    const width = 512;
    const height = 512;

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw rounded rectangle background
    ctx.fillStyle = '#0087ff'; // SMART blue color
    ctx.beginPath();
    // Use arc for rounded corners since roundRect might not be available in all Node versions
    const radius = 80;
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.arcTo(width, 0, width, radius, radius);
    ctx.lineTo(width, height - radius);
    ctx.arcTo(width, height, width - radius, height, radius);
    ctx.lineTo(radius, height);
    ctx.arcTo(0, height, 0, height - radius, radius);
    ctx.lineTo(0, radius);
    ctx.arcTo(0, 0, radius, 0, radius);
    ctx.closePath();
    ctx.fill();

    // Draw book
    ctx.fillStyle = 'white';
    const bookWidth = 350;
    const bookHeight = 100;
    const bookX = (width - bookWidth) / 2;
    const bookY = height / 2 + 20;

    // Open book pages
    ctx.beginPath();
    ctx.moveTo(bookX, bookY);
    ctx.lineTo(bookX, bookY + bookHeight);
    ctx.lineTo(bookX + bookWidth/2, bookY + bookHeight + 30);
    ctx.lineTo(bookX + bookWidth, bookY + bookHeight);
    ctx.lineTo(bookX + bookWidth, bookY);
    ctx.lineTo(bookX + bookWidth/2, bookY - 30);
    ctx.closePath();
    ctx.fill();

    // Draw graduation cap
    const capSize = 150;
    const capX = width / 2 - capSize / 2;
    const capY = bookY - 120;

    // Cap top
    ctx.beginPath();
    ctx.moveTo(capX, capY);
    ctx.lineTo(capX + capSize/2, capY - capSize/2);
    ctx.lineTo(capX + capSize, capY);
    ctx.lineTo(capX + capSize/2, capY + capSize/2);
    ctx.closePath();
    ctx.fill();

    // Cap bottom
    ctx.beginPath();
    ctx.arc(capX + capSize/2, capY + capSize/4, capSize/3, 0, Math.PI);
    ctx.fill();

    // Tassel
    ctx.beginPath();
    ctx.moveTo(capX + capSize/4, capY);
    ctx.lineTo(capX + capSize/4, capY + capSize/2);
    ctx.lineTo(capX + capSize/6, capY + capSize/1.5);
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw pen
    ctx.save();
    ctx.translate(width/2 + 100, height/2 - 50);
    ctx.rotate(Math.PI/4);
    ctx.fillRect(-15, -100, 30, 200);
    ctx.fillStyle = '#0087ff';
    ctx.fillRect(-15, -100, 30, 20);
    ctx.restore();

    // Draw "SMART" text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SMART', width/2, height - 100);

    // Save the image
    const outputPath = path.join(__dirname, '../public/images/app-icons/smart.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`Created custom icon for SMART at ${outputPath}`);
  } catch (error) {
    console.error('Error creating SMART icon:', error);
  }
}

createSmartIcon();
