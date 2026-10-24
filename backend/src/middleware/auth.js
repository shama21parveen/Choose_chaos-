import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";
import { httpError } from "../utils/httpError.js";

// Put this before any route that needs a logged-in user.
// Frontend sends:  Authorization: Bearer <token>
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw httpError(401, "Please log in first");

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw httpError(401, "Your session expired. Please log in again");
  }

  const user = await User.findById(payload.sub);
  if (!user) throw httpError(401, "Account not found. Please log in again");

  req.user = user;
  next();
}
