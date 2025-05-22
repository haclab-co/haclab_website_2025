// This file ensures that the nodejs_compat flag is applied to all routes
export async function onRequest(context) {
  // Just pass the request through
  return await context.next();
}

export const config = {
  compatibility_flags: ["nodejs_compat"]
};
