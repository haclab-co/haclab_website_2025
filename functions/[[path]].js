export async function onRequest(context) {
  const response = await context.next();
  if (response.status === 404) {
    const url = new URL(context.request.url);
    const ext = url.pathname.match(/\.([a-z0-9]+)$/i);
    if (!ext || ext[0] === '.html') {
      const index = await context.env.ASSETS.fetch(
        new URL('/index.html', context.request.url)
      );
      if (index.ok) {
        return new Response(index.body, {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' }
        });
      }
    }
  }
  return response;
}
