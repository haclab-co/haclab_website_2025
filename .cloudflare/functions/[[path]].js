// Catch-all route handler — passes through to middleware
export async function onRequest(context) {
  return await context.next();
}
