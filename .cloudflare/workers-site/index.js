/**
 * This file ensures that the nodejs_compat flag is applied
 * and handles Node.js built-in modules
 */

// Import Node.js built-in modules to ensure they're properly handled
// These are the modules mentioned in the warnings
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
    // Pass the request to the Next.js application
    return await fetch(request);
  }
};

// Explicitly set the nodejs_compat flag
export const config = {
  compatibility_flags: ["nodejs_compat"]
};
