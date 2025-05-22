const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Define the apps we want to create feature images for
const apps = [
  {
    id: 'abacus',
    name: 'Abacus',
    iconPath: 'public/images/icons/abacus.png',
    color: '#0718c4',
    category: 'management'
  },
  {
    id: 'homz',
    name: 'Homz',
    iconPath: '../apps/icons/homz/icon.png',
    color: '#FF4500',
    category: 'hospitality'
  },
  {
    id: 'kanify',
    name: 'Kanify',
    iconPath: 'public/images/icons/kanify.png',
    color: '#FF4500',
    category: 'automotive'
  },
  {
    id: 'lenkit',
    name: 'Lenkit',
    iconPath: 'public/images/icons/lenkit.png',
    color: '#31c48d',
    category: 'finance'
  },
  {
    id: 'smart',
    name: 'SMART',
    iconPath: '../apps/icons/smart/icon.png',
    color: '#0087ff',
    category: 'education'
  }
];

// Create the output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create a feature image for an app
async function createFeatureImage(app) {
  // Define canvas dimensions
  const width = 800;
  const height = 450;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background with app color
  ctx.fillStyle = app.color;
  ctx.fillRect(0, 0, width, height);

  // Add a gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add a pattern overlay for a tech feel
  const patternSize = 10;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';

  for (let x = 0; x < width; x += patternSize) {
    for (let y = 0; y < height; y += patternSize) {
      if (Math.random() > 0.85) {
        ctx.fillRect(x, y, patternSize, patternSize);
      }
    }
  }

  try {
    // Load and draw the app icon
    let iconPath = app.iconPath;
    if (!fs.existsSync(iconPath)) {
      // Try alternative paths if the specified one doesn't exist
      const alternatives = [
        `../apps/icons/${app.id}/icon.png`,
        `../apps/icons/${app.id}/icon-512.png`,
        `../apps/icons/${app.id}.png`
      ];

      for (const altPath of alternatives) {
        if (fs.existsSync(altPath)) {
          iconPath = altPath;
          break;
        }
      }
    }

    if (fs.existsSync(iconPath)) {
      const icon = await loadImage(iconPath);

      // Calculate icon dimensions (40% of the canvas height)
      const iconSize = Math.floor(height * 0.4);
      const iconX = Math.floor((width - iconSize) / 2);
      const iconY = Math.floor((height - iconSize) / 2) - 40;

      // Draw icon
      ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);

      // Add app name
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.fillText(app.name, width / 2, height / 2 + 60);

      // Add category
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      const categoryText = app.category.charAt(0).toUpperCase() + app.category.slice(1);
      ctx.fillText(categoryText, width / 2, height / 2 + 100);

      // Save the image
      const outputPath = path.join(outputDir, `${app.id}.jpg`);
      const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
      fs.writeFileSync(outputPath, buffer);

      console.log(`Created feature image for ${app.name} at ${outputPath}`);
    } else {
      console.error(`Icon not found for ${app.name}`);
    }
  } catch (error) {
    console.error(`Error creating feature image for ${app.name}:`, error);
  }
}

// Create feature images for all apps
async function createAllFeatureImages() {
  for (const app of apps) {
    await createFeatureImage(app);
  }
}

createAllFeatureImages().then(() => {
  console.log('All feature images created successfully!');
}).catch(error => {
  console.error('Error creating feature images:', error);
});
