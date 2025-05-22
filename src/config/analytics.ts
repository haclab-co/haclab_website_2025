/**
 * Google Analytics configuration
 *
 * This file contains the configuration for Google Analytics.
 * Update the tracking ID when needed.
 *
 * UA tracking codes start with 'UA-' (e.g., UA-148952509-3)
 * GA4 tracking codes start with 'G-' (e.g., G-XXXXXXXXXX)
 */
export const ANALYTICS_CONFIG = {
  // Google Analytics tracking ID
  trackingId: 'UA-148952509-3',

  // Enable/disable analytics (useful for development environments)
  enabled: true,

  // Additional configuration options
  options: {
    // Anonymize IP addresses
    anonymizeIp: true,

    // Send page views automatically
    sendPageView: true,

    // Track outbound links
    trackOutboundLinks: true,

    // Track form submissions
    trackForms: true,

    // Track downloads
    trackDownloads: true,

    // Track scroll depth
    trackScrollDepth: true,

    // Track user engagement time
    trackEngagementTime: true,
  },

  // Environment-specific settings
  environments: {
    development: {
      enabled: false, // Disable analytics in development
    },
    production: {
      enabled: true, // Enable analytics in production
    },
  },
};
