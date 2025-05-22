/**
 * Worker script for Cloudflare Pages with Next.js
 * This file handles Node.js compatibility
 */

// Explicitly import Node.js built-in modules that are used by Next.js
try {
  // These imports will only work with nodejs_compat flag
  require('node:buffer');
  require('node:async_hooks');
} catch (e) {
  // Silently fail if modules aren't available
  // This is expected without the nodejs_compat flag
}

export default {
  async fetch(request, env, ctx) {
    // This is a placeholder worker script
    // The actual functionality will be handled by Cloudflare Pages
    try {
      return await fetch(request);
    } catch (err) {
      return new Response(`Worker error: ${err.message}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }
};

// Add compatibility flags
export const config = {
  compatibility_flags: ["nodejs_compat"]
};
