const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create a custom icon for SMART with transparent background
async function createSmartIcon() {
  try {
    // Define canvas dimensions
    const width = 1024;
    const height = 1024;
    
    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Make the entire canvas transparent
    ctx.clearRect(0, 0, width, height);
    
    // Draw rounded rectangle background with blue color
    ctx.fillStyle = '#0087ff'; // SMART blue color
    ctx.beginPath();
    // Use arc for rounded corners
    const radius = 180;
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
    
    // Draw graduation cap with transparent fill
    ctx.fillStyle = 'white'; // White color for the cap
    const capSize = 300;
    const capX = width / 2 - capSize / 2;
    const capY = height / 3;
    
    // Cap top (diamond shape)
    ctx.beginPath();
    ctx.moveTo(capX, capY);
    ctx.lineTo(capX + capSize/2, capY - capSize/2);
    ctx.lineTo(capX + capSize, capY);
    ctx.lineTo(capX + capSize/2, capY + capSize/2);
    ctx.closePath();
    ctx.fill();
    
    // Cap bottom (half circle)
    ctx.beginPath();
    ctx.arc(capX + capSize/2, capY + capSize/4, capSize/3, 0, Math.PI);
    ctx.fill();
    
    // Tassel
    ctx.beginPath();
    ctx.moveTo(capX + capSize/4, capY);
    ctx.lineTo(capX + capSize/4, capY + capSize/2);
    ctx.lineTo(capX + capSize/6, capY + capSize/1.5);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    
    // Draw book
    const bookWidth = 500;
    const bookHeight = 150;
    const bookX = (width - bookWidth) / 2;
    const bookY = height / 2 + 50;
    
    // Open book pages
    ctx.beginPath();
    ctx.moveTo(bookX, bookY);
    ctx.lineTo(bookX, bookY + bookHeight);
    ctx.lineTo(bookX + bookWidth/2, bookY + bookHeight + 50);
    ctx.lineTo(bookX + bookWidth, bookY + bookHeight);
    ctx.lineTo(bookX + bookWidth, bookY);
    ctx.lineTo(bookX + bookWidth/2, bookY - 50);
    ctx.closePath();
    ctx.fill();
    
    // Draw pen
    ctx.save();
    ctx.translate(width/2 + 150, height/2 - 50);
    ctx.rotate(Math.PI/4);
    ctx.fillRect(-20, -150, 40, 300);
    ctx.fillStyle = '#0087ff';
    ctx.fillRect(-20, -150, 40, 30);
    ctx.restore();
    
    // Draw "SMART" text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 200px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SMART', width/2, height - 150);
    
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
