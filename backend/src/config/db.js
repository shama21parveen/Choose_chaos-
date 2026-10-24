import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env.js";

// Some Windows / ISP DNS servers cannot resolve mongodb+srv:// links ("querySrv ECONNREFUSED").
// Using Google + Cloudflare DNS fixes it. Only for local development.
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error(
      "MONGO_URI is empty. Open backend/.env and paste your MongoDB Atlas connection string."
    );
  }

  mongoose.set("strictQuery", true);

  // Fail fast (8s) with a clear message instead of hanging forever
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });

  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected: ${host} / ${name}`);
}
