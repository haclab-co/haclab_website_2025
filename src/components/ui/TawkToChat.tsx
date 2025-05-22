'use client';

import { useEffect } from 'react';

// Define the Tawk_API global interface
declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      onStatusChange?: (status: string) => void;
      addEvent?: (event: string, metadata: any) => void;
      addTags?: (tags: string[], callback?: () => void) => void;
      setAttributes?: (attributes: Record<string, string>, callback?: () => void) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
      toggleVisibility?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      popup?: () => void;
      endChat?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

interface TawkToChatProps {
  propertyId: string;
  widgetId: string;
  customization?: {
    // Visitor information
    name?: string;
    email?: string;
    // UI customization
    hideOnLoad?: boolean;
    hideWidget?: boolean;
    // Tags for categorization
    tags?: string[];
    // Additional attributes
    attributes?: Record<string, string>;
  };
}

/**
 * TawkToChat component that integrates the Tawk.to live chat widget
 *
 * @param propertyId - The Tawk.to property ID from your dashboard
 * @param widgetId - The Tawk.to widget ID from your dashboard
 * @param customization - Optional customization settings for the widget
 */
const TawkToChat: React.FC<TawkToChatProps> = ({
  propertyId,
  widgetId,
  customization
}) => {
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Set up onLoad callback to apply customizations
    window.Tawk_API.onLoad = () => {
      if (customization) {
        // Set visitor information if provided
        if (customization.name || customization.email) {
          window.Tawk_API?.setAttributes?.(
            {
              ...(customization.name && { name: customization.name }),
              ...(customization.email && { email: customization.email }),
              ...customization.attributes
            },
            () => {
              console.log('Tawk.to: Visitor attributes set');
            }
          );
        }

        // Add tags if provided
        if (customization.tags && customization.tags.length > 0) {
          window.Tawk_API?.addTags?.(customization.tags, () => {
            console.log('Tawk.to: Tags added');
          });
        }

        // Hide widget on load if requested
        if (customization.hideOnLoad) {
          window.Tawk_API?.hideWidget?.();
        }

        // Hide widget completely if requested
        if (customization.hideWidget) {
          window.Tawk_API?.hideWidget?.();
        }
      }
    };

    // Remove any existing Tawk.to script to avoid duplicates
    const existingScript = document.getElementById('tawkto-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject the Tawk.to script
    const script = document.createElement('script');
    script.id = 'tawkto-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const scriptToRemove = document.getElementById('tawkto-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Also remove any Tawk.to elements that might have been created
      const tawkElements = document.querySelectorAll('[id^="tawk-"]');
      tawkElements.forEach(element => element.remove());
    };
  }, [propertyId, widgetId, customization]); // Re-run if props change

  // This component doesn't render anything visible
  return null;
};

export default TawkToChat;
