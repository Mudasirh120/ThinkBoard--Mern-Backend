import rateLimit from "../db/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      res.status(429).json({ message: "Too many requests, try later!" });
      return;
    }
  } catch (error) {
    console.log("Rate limit error", error);
  }
  next();
};
export default rateLimiter;
