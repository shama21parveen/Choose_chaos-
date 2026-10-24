import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { httpError } from "../utils/httpError.js";
import { requireAuth } from "../middleware/auth.js";
import { AVATARS, DEFAULT_AVATAR, RESERVED_USERNAMES } from "../data/avatars.js";

const router = Router();

// shared with the profile route: 3-20 letters, numbers or underscore
export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9_]{3,20}$/, "Username: 3-20 characters, only letters, numbers and _")
  .refine((u) => !RESERVED_USERNAMES.includes(u), "That username is not available");

const registerSchema = z.object({
  username: usernameSchema,
  avatar: z.enum(AVATARS, { error: "Pick one of the avatars" }).default(DEFAULT_AVATAR),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, avatar, email, password } = registerSchema.parse(req.body);

  if (await User.exists({ email })) throw httpError(409, "This email is already registered. Try logging in");
  if (await User.exists({ username })) throw httpError(409, "That username is taken. Try another one");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name: username, username, avatar, email, passwordHash });

  res.status(201).json({ token: signToken(user.id), user: user.toPublic() });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email }).select("+passwordHash");
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  // same message for "no such email" and "wrong password" so nobody can guess which emails exist
  if (!ok) throw httpError(401, "Wrong email or password");

  res.json({ token: signToken(user.id), user: user.toPublic() });
});

// GET /api/auth/me   (needs token)
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user.toPublic() });
});

export default router;
