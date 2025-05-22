export default {
  fetch(request, env, ctx) {
    // This is a placeholder worker script
    // The actual functionality will be handled by Cloudflare Pages
    return fetch(request);
  }
};

// Add compatibility flags
export const config = {
  compatibility_flags: ["nodejs_compat"]
};
