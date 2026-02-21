import crypto from "crypto";
import { nowIso } from "../utils/time.js";

export function requestLogger(req, res, next) {
  const start = Date.now();
  const reqId = crypto.randomUUID();

  res.setHeader("X-Request-Id", reqId);

  console.log(`[${nowIso()}] START ${reqId} ${req.method} ${req.url}`);

  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[${nowIso()}] END   ${reqId} ${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
  });

  next();
}
