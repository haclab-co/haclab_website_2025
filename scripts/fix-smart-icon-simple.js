const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a simple SMART icon with transparent background
function createSmartIcon() {
  // Define canvas dimensions
  const width = 512;
  const height = 512;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Clear canvas (transparent background)
  ctx.clearRect(0, 0, width, height);

  // Draw rounded rectangle background with blue color
  ctx.fillStyle = '#0087ff'; // SMART blue color - match the image provided
  const radius = 100;

  // Draw rounded rectangle (more rounded like the image provided)
  ctx.beginPath();
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

  // Draw graduation cap - positioned higher like in the image
  ctx.fillStyle = 'white';
  const capSize = 150;
  const capX = width / 2 - capSize / 2;
  const capY = height / 3 - 20; // Higher position

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
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'white';
  ctx.stroke();

  // Draw book - positioned below the cap like in the image
  const bookWidth = 280;
  const bookHeight = 80;
  const bookX = (width - bookWidth) / 2;
  const bookY = height / 2 + 30;

  // Open book pages
  ctx.beginPath();
  ctx.moveTo(bookX, bookY);
  ctx.lineTo(bookX, bookY + bookHeight);
  ctx.lineTo(bookX + bookWidth/2, bookY + bookHeight + 25);
  ctx.lineTo(bookX + bookWidth, bookY + bookHeight);
  ctx.lineTo(bookX + bookWidth, bookY);
  ctx.lineTo(bookX + bookWidth/2, bookY - 25);
  ctx.closePath();
  ctx.fill();

  // Draw pen
  ctx.save();
  ctx.translate(width/2 + 75, height/2 - 25);
  ctx.rotate(Math.PI/4);
  ctx.fillStyle = 'white';
  ctx.fillRect(-10, -75, 20, 150);
  ctx.fillStyle = '#0087ff';
  ctx.fillRect(-10, -75, 20, 15);
  ctx.restore();

  // Draw "SMART" text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SMART', width/2, height - 80);

  // Save the image
  const outputPath = path.join(__dirname, '../public/images/app-icons/smart.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Created simple SMART icon at ${outputPath}`);
}

createSmartIcon();
