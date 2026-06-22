import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../../config/analytics';

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
  const mergedOptions = {
    ...ANALYTICS_CONFIG.options,
    ...options,
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());

    gtag('config', id, {
      send_page_view: mergedOptions.sendPageView,
      anonymize_ip: mergedOptions.anonymizeIp,
      cookie_flags: 'SameSite=None;Secure',
    });

    if (isUA) {
      window.addEventListener('popstate', function () {
        gtag('config', id, {
          page_path: window.location.pathname,
          send_page_view: true,
        });
      });
    }

    if (mergedOptions.trackOutboundLinks) {
      document.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.href && link.host !== window.location.host) {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: link.href,
          });
        }
      });
    }

    if (mergedOptions.trackForms) {
      document.addEventListener('submit', function (e) {
        const form = e.target as HTMLFormElement;
        if (form && form.id) {
          gtag('event', 'form_submit', {
            event_category: 'forms',
            event_label: form.id || form.action,
          });
        }
      });
    }

    if (mergedOptions.trackScrollDepth) {
      const scrollMarks = [25, 50, 75, 90];
      const marks = new Set<number>();
      window.addEventListener('scroll', function () {
        const scrollPercent =
          (100 * window.scrollY) /
          (document.body.offsetHeight - window.innerHeight);
        for (const mark of scrollMarks) {
          if (scrollPercent >= mark && !marks.has(mark)) {
            marks.add(mark);
            gtag('event', 'scroll_depth', {
              event_category: 'scroll',
              event_label: mark + '%',
              value: mark,
            });
          }
        }
      });
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [id, isUA, mergedOptions]);

  return null;
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default GoogleAnalytics;
