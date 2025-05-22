// This file ensures that the nodejs_compat flag is applied
export default {
  fetch(request, env, ctx) {
    return fetch(request);
  }
};

export const config = {
  compatibility_flags: ["nodejs_compat"]
};
