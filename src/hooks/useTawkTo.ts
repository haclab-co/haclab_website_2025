'use client';

import { useCallback } from 'react';

/**
 * Custom hook for interacting with the Tawk.to chat widget
 * 
 * This hook provides methods to control the Tawk.to widget from any component
 */
export const useTawkTo = () => {
  /**
   * Show the chat widget
   */
  const showWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.showWidget?.();
    }
  }, []);

  /**
   * Hide the chat widget
   */
  const hideWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.hideWidget?.();
    }
  }, []);

  /**
   * Toggle the visibility of the chat widget
   */
  const toggleWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.toggleVisibility?.();
    }
  }, []);

  /**
   * Maximize the chat widget
   */
  const maximizeWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.maximize?.();
    }
  }, []);

  /**
   * Minimize the chat widget
   */
  const minimizeWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.minimize?.();
    }
  }, []);

  /**
   * Open the chat in a popup window
   */
  const popupWidget = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.popup?.();
    }
  }, []);

  /**
   * End the current chat session
   */
  const endChat = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.endChat?.();
    }
  }, []);

  /**
   * Set visitor attributes
   * @param attributes - Object containing visitor attributes
   * @param callback - Optional callback function
   */
  const setAttributes = useCallback((
    attributes: Record<string, string>,
    callback?: () => void
  ) => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.setAttributes?.(attributes, callback);
    }
  }, []);

  /**
   * Add tags to the current chat
   * @param tags - Array of tags to add
   * @param callback - Optional callback function
   */
  const addTags = useCallback((
    tags: string[],
    callback?: () => void
  ) => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.addTags?.(tags, callback);
    }
  }, []);

  /**
   * Add a custom event
   * @param event - Event name
   * @param metadata - Event metadata
   */
  const addEvent = useCallback((
    event: string,
    metadata: any
  ) => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.addEvent?.(event, metadata);
    }
  }, []);

  return {
    showWidget,
    hideWidget,
    toggleWidget,
    maximizeWidget,
    minimizeWidget,
    popupWidget,
    endChat,
    setAttributes,
    addTags,
    addEvent
  };
};

export default useTawkTo;
