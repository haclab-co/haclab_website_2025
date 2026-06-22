export const ANALYTICS_CONFIG = {
  trackingId: 'UA-148952509-3',
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
