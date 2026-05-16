import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "../server/index.js";

const handleRequest = createRequestHandler(build);

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, { env, ctx });
  },
};
