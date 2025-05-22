const fs = require('fs');
const path = require('path');
const https = require('https');

// Function to download the image from a URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded image to ${filepath}`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there's an error
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download the SMART icon from a public URL
async function downloadSmartIcon() {
  try {
    const url = 'https://raw.githubusercontent.com/haclab-co/smart-releases/main/resources/icon.png';
    const outputPath = path.join(__dirname, '../public/images/app-icons/smart.png');
    
    await downloadImage(url, outputPath);
  } catch (error) {
    console.error('Error downloading SMART icon:', error);
  }
}

downloadSmartIcon();
