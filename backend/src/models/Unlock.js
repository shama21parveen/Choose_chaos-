import mongoose from "mongoose";

// One document = "this user unlocked this ending".
// The unique index makes unlocking the same ending twice harmless.
const unlockSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    storyId: { type: String, required: true },
    endingId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

unlockSchema.index({ user: 1, endingId: 1 }, { unique: true });

export default mongoose.model("Unlock", unlockSchema);
