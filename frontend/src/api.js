// All talking to the backend happens here.
// VITE_API_URL comes from frontend/.env (local) or the Vercel dashboard (live).
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const TOKEN_KEY = "choose-chaos-token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
export const setToken = (t) => {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage blocked, ignore */
  }
};

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // server off, no internet, or Render still waking up
    const err = new Error("Cannot reach the server. If it was asleep, wait 30 seconds and try again.");
    err.network = true;
    throw err;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  health: () => request("/health"),
  register: (username, avatar, email, password) =>
    request("/auth/register", { method: "POST", body: { username, avatar, email, password } }),
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/auth/me", { auth: true }),
  syncEndings: (endings) => request("/progress/sync", { method: "POST", body: { endings }, auth: true }),
  saveEnding: (endingId) => request("/progress/ending", { method: "POST", body: { endingId }, auth: true }),
  stats: () => request("/stats/endings"),
  profileMe: () => request("/profile/me", { auth: true }),
  updateProfile: (changes) => request("/profile/me", { method: "PATCH", body: changes, auth: true }),
  publicProfile: (username) => request(`/profile/${encodeURIComponent(username)}`),
};
