const fs = require('fs');
const path = require('path');

// Create placeholder files for each app
function createPlaceholderFiles() {
  // Get the list of app icons
  const iconsDir = path.join(__dirname, '../app-icons');
  const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
  
  // Create a placeholder file for each app
  for (const iconFile of icons) {
    const appId = iconFile.replace('.png', '');
    
    // Create a symlink to the default screenshot for each app
    const defaultScreenshot = path.join(__dirname, 'default-screenshot.svg');
    const appScreenshot = path.join(__dirname, `${appId}-main.png`);
    
    // Create a simple text file as a placeholder
    fs.writeFileSync(
      appScreenshot,
      `This is a placeholder for the ${appId} app screenshot. 
In a production environment, this would be an actual screenshot of the app.`
    );
    
    console.log(`Created placeholder for ${appId}`);
  }
  
  console.log('All placeholders created successfully!');
}

// Run the script
createPlaceholderFiles();
