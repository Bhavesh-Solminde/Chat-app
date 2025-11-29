import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ message: "Access denied: Bot traffic is not allowed." });
      } else if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Access denied: Rate limit exceeded." });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }
    }

    //check for spoofed bots , bots pretending to be legit bots or users
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Access denied: Spoofed bot traffic is not allowed.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
