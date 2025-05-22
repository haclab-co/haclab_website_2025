const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function createDefaultScreenshot() {
  console.log('Creating default screenshot...');
  
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Get the HTML file path
  const htmlPath = path.join(__dirname, 'default-screenshot.html');
  const htmlUrl = `file://${htmlPath}`;
  
  // Navigate to the HTML file
  await page.goto(htmlUrl);
  
  // Wait for the page to load
  await page.waitForTimeout(1000);
  
  // Take a screenshot
  await page.screenshot({ path: path.join(__dirname, 'default-screenshot.png') });
  
  console.log('Default screenshot created successfully!');
  
  // Close the browser
  await browser.close();
}

createDefaultScreenshot().catch(console.error);
