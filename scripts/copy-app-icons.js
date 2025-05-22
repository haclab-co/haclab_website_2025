const fs = require('fs');
const path = require('path');

// Define paths
const appsJsonPath = path.join(__dirname, '../../apps/apps.json');
const iconsSourceDir = path.join(__dirname, '../../apps/icons');
const iconsDestDir = path.join(__dirname, '../public/images/app-icons');

// Create destination directory if it doesn't exist
if (!fs.existsSync(iconsDestDir)) {
  fs.mkdirSync(iconsDestDir, { recursive: true });
  console.log(`Created directory: ${iconsDestDir}`);
}

// Read apps.json
const appsData = JSON.parse(fs.readFileSync(appsJsonPath, 'utf8'));

// Copy icons for each app
Object.keys(appsData).forEach(appId => {
  const app = appsData[appId];

  // Try different possible icon paths
  const possibleIconPaths = [
    path.join(iconsSourceDir, `${appId}.png`),
    path.join(iconsSourceDir, appId, 'icon.png'),
    path.join(iconsSourceDir, appId, 'icon-512.png'),
    path.join(iconsSourceDir, appId, 'logo.png'),
    path.join(iconsSourceDir, appId, 'png', '512x512.png'),
    path.join(iconsSourceDir, appId, 'png', '256x256.png'),
    path.join(iconsSourceDir, appId, 'png', '1024x1024.png')
  ];

  let sourceIconPath = null;

  // Find the first existing icon path
  for (const iconPath of possibleIconPaths) {
    if (fs.existsSync(iconPath)) {
      sourceIconPath = iconPath;
      break;
    }
  }

  if (sourceIconPath) {
    const destIconPath = path.join(iconsDestDir, `${appId}.png`);

    // Copy the icon
    fs.copyFileSync(sourceIconPath, destIconPath);
    console.log(`Copied icon for ${app.name} from ${sourceIconPath} to ${destIconPath}`);
  } else {
    console.error(`Could not find icon for ${app.name}`);
  }
});

console.log('App icons copying completed!');
