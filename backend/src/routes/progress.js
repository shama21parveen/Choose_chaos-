import { Router } from "express";
import { z } from "zod";
import Unlock from "../models/Unlock.js";
import { ENDING_TO_STORY, isValidEnding } from "../data/endings.js";
import { requireAuth } from "../middleware/auth.js";
import { httpError } from "../utils/httpError.js";

const router = Router();
router.use(requireAuth); // everything below needs a logged-in user

const myEndings = async (userId) =>
  (await Unlock.find({ user: userId }).select("endingId -_id").lean()).map((u) => u.endingId);

// Insert endings the user does not have yet. Safe to call many times.
async function saveEndings(userId, ids) {
  const unique = [...new Set(ids)].filter(isValidEnding);
  if (unique.length) {
    await Unlock.bulkWrite(
      unique.map((endingId) => ({
        updateOne: {
          filter: { user: userId, endingId },
          update: { $setOnInsert: { storyId: ENDING_TO_STORY[endingId] } },
          upsert: true,
        },
      }))
    );
  }
}

// GET /api/progress  ->  { endings: ["r1", "e3"] }
router.get("/", async (req, res) => {
  res.json({ endings: await myEndings(req.user._id) });
});

// POST /api/progress/ending   body: { endingId: "r3" }
router.post("/ending", async (req, res) => {
  const { endingId } = z.object({ endingId: z.string() }).parse(req.body);
  if (!isValidEnding(endingId)) throw httpError(400, "Unknown ending");
  await saveEndings(req.user._id, [endingId]);
  res.json({ endings: await myEndings(req.user._id) });
});

// POST /api/progress/sync   body: { endings: ["r1", "e3"] }
// Used right after login: merges the endings a guest unlocked in the browser.
router.post("/sync", async (req, res) => {
  const { endings } = z.object({ endings: z.array(z.string()).max(100) }).parse(req.body);
  await saveEndings(req.user._id, endings);
  res.json({ endings: await myEndings(req.user._id) });
});

export default router;
