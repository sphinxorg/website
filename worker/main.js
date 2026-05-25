export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "foundation.sphinxfnd.org") {
      const foundationUrl = new URL("/foundation" + url.pathname, url);
      return env.ASSETS.fetch(foundationUrl);
    }

    return env.ASSETS.fetch(request);
  }
};
