import mongoose from "mongoose";
import { DEFAULT_AVATAR } from "../data/avatars.js";

const userSchema = new mongoose.Schema(
  {
    // name is kept equal to username (older accounts may have a different name)
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 40 },
    // @handle shown on the profile. sparse = older accounts without one are allowed
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true, minlength: 3, maxlength: 20 },
    avatar: { type: String, default: DEFAULT_AVATAR },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // never sent back to the client unless we ask for it with .select("+passwordHash")
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

// Safe version of the user to send to the frontend
userSchema.methods.toPublic = function () {
  return {
    id: this._id.toString(),
    name: this.name,
    username: this.username || null,
    avatar: this.avatar || DEFAULT_AVATAR,
    email: this.email,
    joinedAt: this.createdAt,
  };
};

export default mongoose.model("User", userSchema);
