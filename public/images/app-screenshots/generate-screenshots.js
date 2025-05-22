const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create a directory for each app and generate placeholder screenshots
async function generatePlaceholderScreenshots() {
  // Get the list of app icons
  const iconsDir = path.join(__dirname, '../app-icons');
  const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
  
  // For each app, create placeholder screenshots
  for (const iconFile of icons) {
    const appId = iconFile.replace('.png', '');
    
    // Create app directory if it doesn't exist
    const appDir = path.join(__dirname, appId);
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }
    
    // Generate placeholder screenshots
    await generateScreenshot(appId, 'dashboard', 'Dashboard View');
    await generateScreenshot(appId, 'feature1', 'Feature 1');
    await generateScreenshot(appId, 'feature2', 'Feature 2');
    await generateScreenshot(appId, 'mobile', 'Mobile View');
  }
  
  console.log('Placeholder screenshots generated successfully!');
}

// Generate a placeholder screenshot for an app
async function generateScreenshot(appId, type, label) {
  // Create a canvas
  const width = type === 'mobile' ? 375 : 1200;
  const height = type === 'mobile' ? 812 : 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, width, height);
  
  // Draw header
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, width, 70);
  
  // Draw app icon
  try {
    const iconPath = path.join(__dirname, '../app-icons', `${appId}.png`);
    const icon = await loadImage(iconPath);
    ctx.drawImage(icon, 20, 15, 40, 40);
  } catch (error) {
    console.error(`Error loading icon for ${appId}:`, error);
  }
  
  // Draw app name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(appId.charAt(0).toUpperCase() + appId.slice(1), 70, 40);
  
  // Draw label
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${appId.toUpperCase()} - ${label}`, width / 2, height / 2);
  
  // Draw placeholder content
  if (type === 'dashboard') {
    drawDashboardPlaceholder(ctx, width, height);
  } else if (type === 'feature1') {
    drawFeature1Placeholder(ctx, width, height);
  } else if (type === 'feature2') {
    drawFeature2Placeholder(ctx, width, height);
  } else if (type === 'mobile') {
    drawMobilePlaceholder(ctx, width, height);
  }
  
  // Save the image
  const outputPath = path.join(__dirname, appId, `${appId}-${type}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Generated ${outputPath}`);
}

// Draw dashboard placeholder content
function drawDashboardPlaceholder(ctx, width, height) {
  // Draw some placeholder cards
  for (let i = 0; i < 3; i++) {
    const cardWidth = 300;
    const cardHeight = 200;
    const cardX = 50 + i * (cardWidth + 30);
    const cardY = 100;
    
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Card ${i + 1}`, cardX + 20, cardY + 30);
    
    // Draw some placeholder data
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(cardX + 20, cardY + 50, cardWidth - 40, 10);
    ctx.fillRect(cardX + 20, cardY + 70, cardWidth - 40, 10);
    ctx.fillRect(cardX + 20, cardY + 90, cardWidth - 40, 10);
  }
  
  // Draw a placeholder table
  const tableX = 50;
  const tableY = 350;
  const tableWidth = width - 100;
  const tableHeight = 300;
  
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(tableX, tableY, tableWidth, tableHeight);
  
  ctx.fillStyle = '#333333';
  ctx.fillRect(tableX, tableY, tableWidth, 40);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('ID', tableX + 20, tableY + 25);
  ctx.fillText('Name', tableX + 120, tableY + 25);
  ctx.fillText('Date', tableX + 320, tableY + 25);
  ctx.fillText('Status', tableX + 520, tableY + 25);
  
  // Draw table rows
  for (let i = 0; i < 5; i++) {
    const rowY = tableY + 40 + i * 50;
    
    ctx.fillStyle = i % 2 === 0 ? '#252525' : '#2a2a2a';
    ctx.fillRect(tableX, rowY, tableWidth, 50);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`#${1000 + i}`, tableX + 20, rowY + 30);
    ctx.fillText(`Item ${i + 1}`, tableX + 120, rowY + 30);
    ctx.fillText(`2023-05-${10 + i}`, tableX + 320, rowY + 30);
    
    // Status indicator
    const statusX = tableX + 520;
    const statusY = rowY + 20;
    const statusWidth = 80;
    const statusHeight = 24;
    
    ctx.fillStyle = i % 3 === 0 ? '#4caf50' : i % 3 === 1 ? '#ff9800' : '#f44336';
    ctx.fillRect(statusX, statusY, statusWidth, statusHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive', statusX + statusWidth / 2, statusY + 16);
  }
}

// Draw feature 1 placeholder content
function drawFeature1Placeholder(ctx, width, height) {
  // Draw a placeholder chart
  const chartX = 50;
  const chartY = 100;
  const chartWidth = width - 100;
  const chartHeight = 300;
  
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(chartX, chartY, chartWidth, chartHeight);
  
  // Draw chart title
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Feature 1 Chart', chartX + 20, chartY + 30);
  
  // Draw chart axes
  ctx.strokeStyle = '#aaaaaa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(chartX + 50, chartY + 70);
  ctx.lineTo(chartX + 50, chartY + 250);
  ctx.lineTo(chartX + chartWidth - 50, chartY + 250);
  ctx.stroke();
  
  // Draw chart data
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(chartX + 50, chartY + 200);
  
  for (let i = 0; i < 10; i++) {
    const x = chartX + 50 + i * ((chartWidth - 100) / 9);
    const y = chartY + 250 - Math.random() * 150;
    ctx.lineTo(x, y);
  }
  
  ctx.stroke();
  
  // Draw some placeholder controls
  const controlsX = 50;
  const controlsY = 450;
  const controlsWidth = width - 100;
  const controlsHeight = 100;
  
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(controlsX, controlsY, controlsWidth, controlsHeight);
  
  // Draw some buttons
  for (let i = 0; i < 4; i++) {
    const buttonX = controlsX + 20 + i * 120;
    const buttonY = controlsY + 30;
    const buttonWidth = 100;
    const buttonHeight = 40;
    
    ctx.fillStyle = i === 0 ? '#ff0000' : '#333333';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Button ${i + 1}`, buttonX + buttonWidth / 2, buttonY + 25);
  }
}

// Draw feature 2 placeholder content
function drawFeature2Placeholder(ctx, width, height) {
  // Draw a placeholder form
  const formX = 50;
  const formY = 100;
  const formWidth = width - 100;
  const formHeight = 500;
  
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(formX, formY, formWidth, formHeight);
  
  // Draw form title
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Feature 2 Form', formX + 20, formY + 30);
  
  // Draw form fields
  const fields = ['Name', 'Email', 'Phone', 'Address', 'City', 'Country'];
  
  for (let i = 0; i < fields.length; i++) {
    const fieldY = formY + 70 + i * 60;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(fields[i], formX + 20, fieldY);
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(formX + 20, fieldY + 10, formWidth - 40, 40);
  }
  
  // Draw submit button
  const buttonX = formX + formWidth - 120;
  const buttonY = formY + formHeight - 60;
  const buttonWidth = 100;
  const buttonHeight = 40;
  
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Submit', buttonX + buttonWidth / 2, buttonY + 25);
}

// Draw mobile placeholder content
function drawMobilePlaceholder(ctx, width, height) {
  // Draw a mobile header
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, width, 60);
  
  // Draw back button
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('←', 20, 38);
  
  // Draw title
  ctx.fillStyle = '#ffffff';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Mobile View', width / 2, 38);
  
  // Draw some list items
  for (let i = 0; i < 10; i++) {
    const itemY = 80 + i * 70;
    
    ctx.fillStyle = i % 2 === 0 ? '#1e1e1e' : '#252525';
    ctx.fillRect(0, itemY, width, 60);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Item ${i + 1}`, 20, itemY + 25);
    
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '14px Arial';
    ctx.fillText('Subtitle text goes here', 20, itemY + 45);
    
    // Draw arrow
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '20px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('→', width - 20, itemY + 35);
  }
  
  // Draw bottom navigation
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, height - 60, width, 60);
  
  // Draw nav items
  const navItems = ['Home', 'Search', 'Profile', 'Settings'];
  
  for (let i = 0; i < navItems.length; i++) {
    const itemX = (width / navItems.length) * i + (width / navItems.length) / 2;
    
    ctx.fillStyle = i === 0 ? '#ff0000' : '#aaaaaa';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(navItems[i], itemX, height - 20);
    
    // Draw icon placeholder
    ctx.fillStyle = i === 0 ? '#ff0000' : '#aaaaaa';
    ctx.beginPath();
    ctx.arc(itemX, height - 40, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Run the script
generatePlaceholderScreenshots().catch(console.error);
