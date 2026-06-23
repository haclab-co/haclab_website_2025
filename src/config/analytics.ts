export const ANALYTICS_CONFIG = {
  trackingId: 'G-0RZSLJ4SL8', // TODO: Replace with actual GA4 measurement ID
  enabled: true,
  options: {
    anonymizeIp: true,
    sendPageView: true,
    trackOutboundLinks: true,
    trackForms: true,
    trackDownloads: true,
    trackScrollDepth: true,
    trackEngagementTime: true,
  },
  environments: {
    development: {
      enabled: false,
    },
    production: {
      enabled: true,
    },
  },
};
