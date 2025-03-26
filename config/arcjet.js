import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

export const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],   // Identifies based on source IP
  rules: [
    // Shield configuration for protection
    shield({ mode: "LIVE" }),

    // Bot detection rule with exceptions for search engines
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate limiting with token bucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,       // 5 tokens per interval
      interval: 10,        // Interval in seconds
      capacity: 10,        // Max tokens in the bucket
    }),
  ],
});
