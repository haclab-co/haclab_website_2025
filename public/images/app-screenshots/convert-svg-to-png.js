const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function convertSvgToPng() {
  try {
    console.log('Converting SVG to PNG...');
    
    // Create a canvas
    const width = 1200;
    const height = 800;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, width, height);
    
    // Draw header
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, width, 70);
    
    // Draw app name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('App Dashboard', 20, 45);
    
    // Draw version
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('v1.0.0', 1160, 45);
    
    // Draw sidebar
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 70, 200, 730);
    
    // Draw active menu item
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(0, 100, 200, 40);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 100, 4, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Dashboard', 20, 125);
    
    // Draw other menu items
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Analytics', 20, 175);
    ctx.fillText('Reports', 20, 225);
    ctx.fillText('Settings', 20, 275);
    ctx.fillText('Users', 20, 325);
    
    // Draw cards
    // Card 1
    ctx.fillStyle = '#252525';
    roundRect(ctx, 220, 90, 300, 180, 5, true, false);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Total Users', 240, 120);
    ctx.font = 'bold 28px Arial';
    ctx.fillText('2,543', 240, 160);
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '14px Arial';
    ctx.fillText('↑ 12% from last month', 240, 190);
    
    // Card 2
    ctx.fillStyle = '#252525';
    roundRect(ctx, 540, 90, 300, 180, 5, true, false);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Revenue', 560, 120);
    ctx.font = 'bold 28px Arial';
    ctx.fillText('$12,850', 560, 160);
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '14px Arial';
    ctx.fillText('↑ 8% from last month', 560, 190);
    
    // Card 3
    ctx.fillStyle = '#252525';
    roundRect(ctx, 860, 90, 300, 180, 5, true, false);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Conversion Rate', 880, 120);
    ctx.font = 'bold 28px Arial';
    ctx.fillText('3.6%', 880, 160);
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '14px Arial';
    ctx.fillText('↑ 2% from last month', 880, 190);
    
    // Draw table
    ctx.fillStyle = '#252525';
    roundRect(ctx, 220, 290, 940, 400, 5, true, false);
    ctx.fillStyle = '#333333';
    roundRect(ctx, 220, 290, 940, 50, { tl: 5, tr: 5, br: 0, bl: 0 }, true, false);
    
    // Table header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Name', 250, 320);
    ctx.fillText('Date', 450, 320);
    ctx.fillText('Amount', 650, 320);
    ctx.fillText('Status', 850, 320);
    
    // Table rows
    // Row 1
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(220, 340, 940, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText('John Smith', 250, 375);
    ctx.fillText('2023-05-12', 450, 375);
    ctx.fillText('$120.00', 650, 375);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
    roundRect(ctx, 850, 360, 80, 30, 15, true, false);
    ctx.fillStyle = '#4caf50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Active', 890, 380);
    
    // Row 2
    ctx.fillStyle = '#252525';
    ctx.fillRect(220, 400, 940, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Sarah Johnson', 250, 435);
    ctx.fillText('2023-05-11', 450, 435);
    ctx.fillText('$85.50', 650, 435);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
    roundRect(ctx, 850, 420, 80, 30, 15, true, false);
    ctx.fillStyle = '#4caf50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Active', 890, 440);
    
    // Row 3
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(220, 460, 940, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Michael Brown', 250, 495);
    ctx.fillText('2023-05-10', 450, 495);
    ctx.fillText('$220.75', 650, 495);
    ctx.fillStyle = 'rgba(255, 152, 0, 0.2)';
    roundRect(ctx, 850, 480, 80, 30, 15, true, false);
    ctx.fillStyle = '#ff9800';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Pending', 890, 500);
    
    // Row 4
    ctx.fillStyle = '#252525';
    ctx.fillRect(220, 520, 940, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Emily Davis', 250, 555);
    ctx.fillText('2023-05-09', 450, 555);
    ctx.fillText('$65.25', 650, 555);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
    roundRect(ctx, 850, 540, 80, 30, 15, true, false);
    ctx.fillStyle = '#4caf50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Active', 890, 560);
    
    // Draw code overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    
    // Draw code text
    ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    let y = 720;
    ctx.fillText('import { Dashboard } from \'./components\';', 20, y);
    ctx.fillText('import { useData } from \'./hooks\';', 20, y + 20);
    ctx.fillText('', 20, y + 40);
    ctx.fillText('function App() {', 20, y + 60);
    ctx.fillText('  const { data, loading } = useData();', 20, y + 80);
    ctx.fillText('', 20, y + 100);
    ctx.fillText('  return (', 20, y + 120);
    ctx.fillText('    <Dashboard data={data} />', 20, y + 140);
    ctx.fillText('  );', 20, y + 160);
    ctx.fillText('}', 20, y + 180);
    
    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'default-screenshot.png'), buffer);
    
    console.log('PNG created successfully!');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
  }
  
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  
  if (fill) {
    ctx.fill();
  }
  
  if (stroke) {
    ctx.stroke();
  }
}

// Run the script
convertSvgToPng().catch(console.error);
