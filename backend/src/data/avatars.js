// Avatar ids the user can pick (Duolingo style). The pictures are drawn in the frontend
// (src/components/AvatarPic.jsx). If you add one there, add its id here too.
export const AVATARS = [
  "ghost", "fox", "cat", "astronaut", "detective", "robot",
  "vampire", "wizard", "alien", "bunny", "skull", "cupid",
];
export const DEFAULT_AVATAR = "ghost";
export const isValidAvatar = (id) => AVATARS.includes(id);

// usernames nobody can take
export const RESERVED_USERNAMES = ["me", "admin", "root", "support", "api", "choosechaos", "chaos", "null", "undefined"];
