// This middleware ensures that the nodejs_compat flag is applied
export async function onRequest(context) {
  return await context.next();
}

export const config = {
  compatibility_flags: ["nodejs_compat"]
};
