import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { env, isProd } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/progress.js";
import statsRoutes from "./routes/stats.js";
import profileRoutes from "./routes/profile.js";

const app = express();

app.set("trust proxy", 1); // needed on Render so rate-limit sees the real IP

app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      // allow tools like Thunder Client / curl (no origin) and our own frontend
      if (!origin || env.clientUrls.includes(origin)) return cb(null, true);
      const err = new Error(`CORS blocked: ${origin}`);
      err.status = 403;
      cb(err);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));
if (!isProd) app.use(morgan("dev"));

// basic protection: 200 requests / 15 min per IP
app.use(
  "/api",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true, legacyHeaders: false })
);

// ---------- routes ----------
const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    app: "Choose Chaos API",
    db: DB_STATES[mongoose.connection.readyState] || "unknown",
    time: new Date().toISOString(),
  });
});

// stricter limit for login / register (stops password guessing)
app.use(
  "/api/auth",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false, message: { message: "Too many attempts. Try again in a few minutes" } })
);

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
