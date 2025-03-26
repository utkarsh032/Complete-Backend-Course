import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ success: false, error: 'Rate limit exceeded' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ success: false, error: 'Bot Detected' });
      }
      return res.status(403).json({ success: false, error: 'Access Denied' });
    }

    next();
  } catch (error) {
    console.error(`Arcjet Middleware Error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
