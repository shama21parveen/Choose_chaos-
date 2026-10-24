import { ZodError } from "zod";
import { isProd } from "../config/env.js";

// Any route that does not exist
export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Every error thrown in a route ends up here
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // bad input from the frontend (zod) -> 400 with a friendly message
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0]?.message || "Invalid input" });
  }
  // two people registering the same email at the exact same moment
  if (err?.code === 11000) {
    return res.status(409).json({ message: "Already exists" });
  }

  const status = err.status || (res.statusCode >= 400 ? res.statusCode : 500);
  if (status >= 500) console.error(err);
  res.status(status).json({
    message: err.message || "Something went wrong",
    ...(isProd ? {} : { stack: err.stack }),
  });
}
