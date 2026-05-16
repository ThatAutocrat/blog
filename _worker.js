import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "../server/index.js";

const handleRequest = createRequestHandler(build);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Let Cloudflare Pages serve static assets directly
    if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/images/")) {
      return env.ASSETS.fetch(request);
    }

    return handleRequest(request, { env, ctx });
  },
};
