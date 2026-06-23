// SPA catch-all: serve index.html for all non-file routes
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // If the request is for a file with an extension, pass through normally
  if (/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
    return await context.next();
  }

  // For all other routes, serve the SPA index.html
  const response = await env.ASSETS.fetch(
    new URL('/index.html', request.url)
  );

  return new Response(response.body, {
    status: 200,
    headers: response.headers
  });
}

export const config = {
  compatibility_flags: ["nodejs_compat"]
};
