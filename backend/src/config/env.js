import dotenv from "dotenv";

dotenv.config({ quiet: true });

// Read every setting in ONE place so the rest of the app never touches process.env directly.
export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "",
  clientUrls: (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((u) => u.trim().replace(/\/$/, ""))
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || "",
};

export const isProd = env.nodeEnv === "production";
