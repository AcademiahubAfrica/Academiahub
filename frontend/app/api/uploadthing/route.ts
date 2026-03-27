import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
