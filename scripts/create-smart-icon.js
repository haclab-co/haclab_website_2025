const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a custom icon for SMART since we don't have a PNG version
function createSmartIcon() {
  // Define canvas dimensions
  const width = 512;
  const height = 512;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background with SMART's color
  ctx.fillStyle = '#0087ff';
  ctx.fillRect(0, 0, width, height);

  // Add a gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw a stylized "S" for SMART
  ctx.fillStyle = 'white';
  ctx.font = 'bold 300px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', width / 2, height / 2);

  // Add a border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 20;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Save the image
  const outputPath = path.join(__dirname, '../public/images/app-icons/smart.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Created custom icon for SMART at ${outputPath}`);
}

createSmartIcon();
