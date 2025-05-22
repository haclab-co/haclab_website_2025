'use client';

import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '@/config/analytics';

/**
 * GoogleAnalytics component for tracking website usage
 *
 * This component adds the Google Analytics tracking code to the website.
 * It supports both Universal Analytics (UA) and Google Analytics 4 (GA4) tracking codes.
 *
 * UA tracking codes start with 'UA-' (e.g., UA-148952509-3)
 * GA4 tracking codes start with 'G-' (e.g., G-XXXXXXXXXX)
 */
interface GoogleAnalyticsProps {
  id: string;
  options?: {
    anonymizeIp?: boolean;
    sendPageView?: boolean;
    trackOutboundLinks?: boolean;
    trackForms?: boolean;
    trackDownloads?: boolean;
    trackScrollDepth?: boolean;
    trackEngagementTime?: boolean;
  };
}

const GoogleAnalytics = ({ id, options = ANALYTICS_CONFIG.options }: GoogleAnalyticsProps) => {
  const isUA = id.startsWith('UA-');

  // Merge default options with provided options
  const mergedOptions = {
    ...ANALYTICS_CONFIG.options,
    ...options,
  };

  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());

    // Configure Google Analytics
    gtag('config', id, {
      send_page_view: mergedOptions.sendPageView,
      anonymize_ip: mergedOptions.anonymizeIp,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Additional setup for Universal Analytics
    if (isUA) {
      window.addEventListener('popstate', function() {
        gtag('config', id, {
          page_path: window.location.pathname,
          send_page_view: true
        });
      });
    }

    // Track outbound links
    if (mergedOptions.trackOutboundLinks) {
      document.addEventListener('click', function(e) {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        if (link && link.href && link.host !== window.location.host) {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: link.href
          });
        }
      });
    }

    // Track form submissions
    if (mergedOptions.trackForms) {
      document.addEventListener('submit', function(e) {
        const form = e.target as HTMLFormElement;
        if (form && form.id) {
          gtag('event', 'form_submit', {
            event_category: 'forms',
            event_label: form.id || form.action
          });
        }
      });
    }

    // Track scroll depth
    if (mergedOptions.trackScrollDepth) {
      let scrollMarks = [25, 50, 75, 90];
      let marks = new Set();

      window.addEventListener('scroll', function() {
        const scrollPercent = 100 * window.scrollY / (document.body.offsetHeight - window.innerHeight);

        for (const mark of scrollMarks) {
          if (scrollPercent >= mark && !marks.has(mark)) {
            marks.add(mark);
            gtag('event', 'scroll_depth', {
              event_category: 'scroll',
              event_label: mark + '%',
              value: mark
            });
          }
        }
      });
    }

    // Cleanup function
    return () => {
      // Remove the script tag if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [id, isUA, mergedOptions]);

  return null; // This component doesn't render anything
};

// Add global type for gtag
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default GoogleAnalytics;
