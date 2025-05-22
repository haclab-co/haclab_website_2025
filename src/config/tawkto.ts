/**
 * Tawk.to configuration
 *
 * To get your Property ID and Widget ID:
 * 1. Log in to your Tawk.to dashboard
 * 2. Go to Administration > Property Settings
 * 3. Find your Property ID and Widget ID in the widget code
 *
 * The widget code looks like:
 * <!--Start of Tawk.to Script-->
 * <script type="text/javascript">
 * var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
 * (function(){
 * var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
 * s1.async=true;
 * s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
 * s1.charset='UTF-8';
 * s1.setAttribute('crossorigin','*');
 * s0.parentNode.insertBefore(s1,s0);
 * })();
 * </script>
 * <!--End of Tawk.to Script-->
 */

export const TAWKTO_CONFIG = {
  // Replace these with your actual Tawk.to credentials
  propertyId: '622b2d1b1ffac05b1d7e1559',
  widgetId: '1ftsagffq',

  // Main configuration options
  enabled: true, // Set to false to temporarily disable the chat widget

  // Customization options
  customization: {
    // Default visitor information (optional)
    // name: 'Visitor',
    // email: '',

    // UI customization
    hideOnLoad: false, // Set to true to hide the widget when the page loads
    hideWidget: false, // Set to true to completely hide the widget

    // Tags for categorization in the Tawk.to dashboard
    tags: ['haclab-website', 'uganda', 'software-development'],

    // Additional attributes to identify the visitor
    attributes: {
      'company': 'Haclab Company Limited',
      'location': 'Uganda',
      'source': 'website'
    }
  }
};
