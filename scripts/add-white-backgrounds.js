const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Directory containing app icons
const iconsDir = path.join(__dirname, '../public/images/app-icons');

// Function to add white background to an icon
async function addWhiteBackground(iconPath) {
  try {
    // Load the original icon
    const originalIcon = await loadImage(iconPath);
    
    // Create a canvas with the same dimensions
    const width = originalIcon.width;
    const height = originalIcon.height;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Draw the original icon on top
    ctx.drawImage(originalIcon, 0, 0, width, height);
    
    // Save the modified icon
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(iconPath, buffer);
    
    console.log(`Added white background to ${path.basename(iconPath)}`);
  } catch (error) {
    console.error(`Error processing ${path.basename(iconPath)}:`, error);
  }
}

// Process all icons in the directory
async function processAllIcons() {
  try {
    // Get all PNG files in the icons directory
    const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
    
    console.log(`Found ${files.length} icons to process`);
    
    // Process each icon
    for (const file of files) {
      const iconPath = path.join(iconsDir, file);
      await addWhiteBackground(iconPath);
    }
    
    console.log('All icons processed successfully!');
  } catch (error) {
    console.error('Error processing icons:', error);
  }
}

// Run the script
processAllIcons();
