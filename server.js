import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { router } from "./router.js";
import { requestLogger } from "./middleware/requestLogger.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// mount all API routes
app.use("/api", router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found", code: 404 } });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: { message: "Payload too large", code: 413 } });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON", code: 400 } });
  }

  if (!res.headersSent) {
    res.status(500).json({ error: { message: "Internal server error", code: 500 } });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
