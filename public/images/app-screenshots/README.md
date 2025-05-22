# App Screenshots

This directory contains screenshots for the various apps showcased on the Haclab website.

## Default Screenshot

The `default-screenshot.html` file can be used to generate a default screenshot for apps that don't have specific screenshots. To generate the default screenshot, you can use the `create-default-screenshot.js` script with Puppeteer:

```bash
# Install puppeteer if not already installed
npm install puppeteer

# Run the script
node create-default-screenshot.js
```

This will generate a `default-screenshot.png` file that will be used as a fallback for apps without specific screenshots.

## App-Specific Screenshots

For each app, create screenshots with the following naming convention:

- `[app-id]-dashboard.png` - Main dashboard view
- `[app-id]-feature1.png` - Feature 1 screenshot
- `[app-id]-feature2.png` - Feature 2 screenshot
- etc.

For example, for the Abacus app:
- `abacus-dashboard.png`
- `abacus-inventory.png`
- `abacus-reports.png`

## Screenshot Dimensions

For best results, use the following dimensions for screenshots:
- Desktop: 1200 x 800 pixels
- Mobile: 375 x 812 pixels (iPhone X dimensions)
