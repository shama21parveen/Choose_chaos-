import { Router } from "express";
import User from "../models/User.js";
import Unlock from "../models/Unlock.js";
import { ENDING_TO_STORY } from "../data/endings.js";

const router = Router();

// GET /api/stats/endings   (public)
// -> { totalPlayers: 12, endings: { r1: { count: 5, percent: 42 }, ... } }
// percent = players who unlocked it / all registered players
router.get("/endings", async (req, res) => {
  const [totalPlayers, rows] = await Promise.all([
    User.countDocuments(),
    Unlock.aggregate([{ $group: { _id: "$endingId", count: { $sum: 1 } } }]),
  ]);

  const counts = Object.fromEntries(rows.map((r) => [r._id, r.count]));
  const endings = {};
  for (const id of Object.keys(ENDING_TO_STORY)) {
    const count = counts[id] || 0;
    endings[id] = { count, percent: totalPlayers ? Math.round((count / totalPlayers) * 100) : 0 };
  }

  res.json({ totalPlayers, endings });
});

export default router;
