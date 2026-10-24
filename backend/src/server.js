import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function start() {
  if (!env.jwtSecret || env.jwtSecret.length < 16) {
    console.error("\nJWT_SECRET is missing (or too short). Open backend/.env and set a long random string.");
    console.error("Generate one with:\n  node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\"\n");
    process.exit(1);
  }
  try {
    await connectDB();
  } catch (err) {
    console.error("\nCould not connect to MongoDB:");
    console.error("  " + err.message);
    console.error("\nCheck: 1) MONGO_URI in .env  2) Atlas password  3) Atlas Network Access (IP allowed)\n");
    process.exit(1);
  }

  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}  (${env.nodeEnv})`);
  });
}

start();
