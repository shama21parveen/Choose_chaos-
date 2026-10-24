import { Router } from "express";
import { z } from "zod";
import User from "../models/User.js";
import Unlock from "../models/Unlock.js";
import { ENDINGS } from "../data/endings.js";
import { AVATARS } from "../data/avatars.js";
import { usernameSchema } from "./auth.js";
import { requireAuth } from "../middleware/auth.js";
import { httpError } from "../utils/httpError.js";

const router = Router();

// [{ endingId: "r3", at: <date unlocked> }] oldest first
const unlocksOf = async (userId) =>
  (await Unlock.find({ user: userId }).select("endingId createdAt -_id").sort({ createdAt: 1 }).lean()).map((u) => ({
    endingId: u.endingId,
    at: u.createdAt,
  }));

// per story: { thriller: { found: 2, total: 4 }, romance: {...} } + overall
function summarise(ids) {
  const stories = {};
  let found = 0;
  let total = 0;
  for (const [story, list] of Object.entries(ENDINGS)) {
    const f = list.filter((e) => ids.includes(e)).length;
    stories[story] = { found: f, total: list.length };
    found += f;
    total += list.length;
  }
  return { found, total, stories };
}

// GET /api/profile/me   (needs token)
router.get("/me", requireAuth, async (req, res) => {
  const unlocks = await unlocksOf(req.user._id);
  const endings = unlocks.map((u) => u.endingId);
  res.json({ user: req.user.toPublic(), endings, unlocks, summary: summarise(endings) });
});

// PATCH /api/profile/me   body: { username?, avatar? }
router.patch("/me", requireAuth, async (req, res) => {
  const body = z
    .object({ username: usernameSchema.optional(), avatar: z.enum(AVATARS, { error: "Pick one of the avatars" }).optional() })
    .parse(req.body);

  if (body.username && body.username !== req.user.username) {
    const taken = await User.exists({ username: body.username, _id: { $ne: req.user._id } });
    if (taken) throw httpError(409, "That username is taken. Try another one");
    req.user.username = body.username;
    req.user.name = body.username;
  }
  if (body.avatar) req.user.avatar = body.avatar;

  await req.user.save();
  res.json({ user: req.user.toPublic() });
});

// GET /api/profile/:username   (public, anyone with the link can view)
// Never returns email. Only what a profile page needs.
router.get("/:username", async (req, res) => {
  const username = String(req.params.username).toLowerCase();
  const user = await User.findOne({ username });
  if (!user) throw httpError(404, "No player with that username");

  const unlocks = await unlocksOf(user._id);
  const endings = unlocks.map((u) => u.endingId);
  const { email, ...publicUser } = user.toPublic(); // eslint-disable-line no-unused-vars
  res.json({ user: publicUser, endings, unlocks, summary: summarise(endings) });
});

export default router;
