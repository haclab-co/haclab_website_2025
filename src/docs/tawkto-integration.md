# Tawk.to Chat Integration for Haclab Website

This document explains how to set up and customize the Tawk.to live chat widget on the Haclab website.

## Setup Instructions

### 1. Create a Tawk.to Account

1. Go to [Tawk.to](https://www.tawk.to/) and sign up for a free account
2. Complete the registration process and set up your account

### 2. Get Your Property ID and Widget ID

1. Log in to your Tawk.to dashboard
2. Go to Administration > Property Settings
3. Find your Property ID and Widget ID in the widget code section
4. The widget code looks like:
   ```javascript
   <!--Start of Tawk.to Script-->
   <script type="text/javascript">
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();
   </script>
   <!--End of Tawk.to Script-->
   ```
5. Note the `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` values

### 3. Configure the Tawk.to Integration

1. Open the file `src/config/tawkto.ts`
2. Replace the placeholder values with your actual Property ID and Widget ID:
   ```typescript
   export const TAWKTO_CONFIG = {
     // Replace these with your actual Tawk.to credentials
     propertyId: 'YOUR_PROPERTY_ID', // Replace with your actual Property ID
     widgetId: 'YOUR_WIDGET_ID',     // Replace with your actual Widget ID
     
     // Main configuration options
     enabled: true,
     
     // Customization options...
   };
   ```

### 4. Customize the Chat Widget Appearance

1. Log in to your Tawk.to dashboard
2. Go to Administration > Chat Widget
3. Customize the appearance of your chat widget:
   - Colors: Set the primary color to Haclab red (#FF0000)
   - Position: Choose the position of the widget (bottom right is recommended)
   - Language: Set to English or your preferred language
   - Online/Offline messages: Customize the greeting messages
4. Save your changes

## Using the Chat Widget in Components

### Basic Usage

The chat widget is automatically loaded on all pages of the website. No additional code is needed for basic functionality.

### Using the ChatButton Component

To add a button that opens the chat widget:

```tsx
import ChatButton from '@/components/ui/ChatButton';

// In your component:
<ChatButton 
  variant="primary" 
  size="md" 
  text="Chat with our team" 
/>
```

### Using the useTawkTo Hook

For more advanced control of the chat widget, use the `useTawkTo` hook:

```tsx
import { useTawkTo } from '@/hooks/useTawkTo';

// In your component:
const { 
  showWidget, 
  hideWidget, 
  maximizeWidget, 
  minimizeWidget,
  setAttributes 
} = useTawkTo();

// Example: Set visitor attributes
const handleLogin = (user) => {
  setAttributes({
    name: user.name,
    email: user.email,
    id: user.id
  });
};

// Example: Open chat widget on button click
<button onClick={maximizeWidget}>
  Open Chat
</button>
```

## Customization Options

### Widget Visibility

To temporarily disable the chat widget, set `enabled: false` in the `TAWKTO_CONFIG` object:

```typescript
export const TAWKTO_CONFIG = {
  // ...
  enabled: false, // Set to false to disable the widget
  // ...
};
```

### Visitor Information

You can pre-set visitor information in the configuration:

```typescript
export const TAWKTO_CONFIG = {
  // ...
  customization: {
    name: 'John Doe', // Pre-set visitor name
    email: 'john@example.com', // Pre-set visitor email
    // ...
  }
};
```

### Tags and Attributes

You can add tags and attributes to help categorize conversations:

```typescript
export const TAWKTO_CONFIG = {
  // ...
  customization: {
    // ...
    tags: ['website', 'support', 'uganda'],
    attributes: {
      'company': 'Haclab Company Limited',
      'location': 'Kampala, Uganda',
      'source': 'website'
    }
  }
};
```

## Troubleshooting

### Widget Not Appearing

1. Check that `enabled` is set to `true` in the configuration
2. Verify that your Property ID and Widget ID are correct
3. Check the browser console for any JavaScript errors
4. Make sure you're not in offline mode in the Tawk.to dashboard

### Widget Not Styled Correctly

1. Check the custom styling settings in your Tawk.to dashboard
2. Make sure the widget is not being hidden by other elements on the page
3. Test on different browsers and devices to ensure compatibility

## Support

For additional help with Tawk.to integration:

1. Visit the [Tawk.to Help Center](https://help.tawk.to/)
2. Contact the Haclab development team at support@haclab.net
