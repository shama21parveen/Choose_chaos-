<div align="center">

# 🎭 CHOOSE CHAOS

### *Every tap writes a story.*

Pick a world. Make fast choices. Hunt down the secret endings.

<br/>

![React](https://img.shields.io/badge/React_19-0a0405?style=for-the-badge&logo=react&logoColor=ff3b3b)
![Vite](https://img.shields.io/badge/Vite-0a0405?style=for-the-badge&logo=vite&logoColor=ffb347)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-0a0405?style=for-the-badge&logo=tailwindcss&logoColor=2dd4bf)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0a0405?style=for-the-badge&logo=framer&logoColor=ff3b3b)
![Node](https://img.shields.io/badge/Node.js-0a0405?style=for-the-badge&logo=nodedotjs&logoColor=2dd4bf)
![MongoDB](https://img.shields.io/badge/MongoDB-0a0405?style=for-the-badge&logo=mongodb&logoColor=2dd4bf)

<br/>

| 🔴 Live Demo | 📖 Story Worlds | 🏆 Secret Endings |
| :---: | :---: | :---: |
| **Dropping soon** 🚧<br/>*the chaos is still being deployed* | **4** worlds<br/>*2 playable, 2 cooking* | **10** and counting<br/>*some are very well hidden* |

</div>

---

## ✨ What is this?

**Choose Chaos** is an interactive, choose-your-own-adventure story website where **you** are the main character. No watching, no waiting. You read a short scene, pick what happens next, and the story bends around you.

Every genre has its own look, its own music, its own typing sound, and its own **secret endings**.

Read everything for free as a guest, or log in so we can keep count of every ending you find.

## 🌍 The Worlds

| | World | Story | Vibe | Status |
| :---: | --- | --- | --- | --- |
| 🕵️ | **Psychological Thriller** | *Left on Read* | Dark, tense, twisty. Timed choices and a Doubt meter | ✅ Playable (4 endings) |
| 💌 | **Rom-Com** | *Crush Hour* | Cute K-drama school life. Spark meter | ✅ Playable (6 endings) |
| 🚀 | **Sci-Fi** | ??? | Neon, lonely, mind-bending | 🚧 In the making |
| 👻 | **Horror** | ??? | Slow-burn dread, loud silence | 🚧 In the making |

## 🎬 Features

- 🎪 **Multi-genre hub** with a poster fan, genre showcase cards, house rules and a secret endings wall
- 🗺️ **Genre landing pages**, each with its own theme, background animation, rules, chapters and endings
- 🌿 **Branching story engine**: timed choices, hidden choices that unlock with a meter, multiple endings
- 🎧 **Procedural sound** generated live with the Web Audio API (zero audio files). Different music and typing sounds per genre
- 🌫️ **Living backgrounds**: animated SVG scene art with parallax, plus canvas fog, rain, embers, petals and hearts
- 🖱️ **Cursors with personality**: an ember with a comet tail on the hub, a beating heart and a love-letter on the rom-com page, sparks and hearts in the footer
- 👤 **Guest mode** (read free) and real JWT login (track your secret endings across devices)
- 🧙 **Player profiles**: Duolingo-style avatars, a username, rank titles (Bystander to Chaos Legend), a sparkling profile page with a trophy wall, and a shareable `/u/username` link
- 📊 **Live stats**: every ending shows what % of players unlocked it
- 🔄 **Guest to player**: endings you unlock as a guest are merged into your account when you log in
- 📱 Fully responsive, and kind to `prefers-reduced-motion`

## 🛠️ Tech Stack

**Frontend**

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- Web Audio API, Canvas, SVG

**Backend**

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication (bcrypt password hashing, zod validation, rate limiting, helmet, CORS)

## 📁 Project Structure

```
choose_chaos/
├── frontend/
│   ├── index.html
│   ├── vercel.json             # makes /genre/... links work after deploy
│   ├── .env.example            # VITE_API_URL
│   ├── public/                 # favicon
│   └── src/
│       ├── App.jsx             # app shell, routes, login + sync with the API
│       ├── api.js              # every call to the backend lives here
│       ├── context.js          # shared state (endings, user, sound, stats)
│       ├── hub.css, profile.css
│       ├── pages/
│       │   ├── Hub.jsx         # multi-genre landing page
│       │   ├── GenrePage.jsx   # /genre/:id
│       │   ├── RomancePage.jsx # rom-com landing page
│       │   ├── Play.jsx        # /play/:id (the story player)
│       │   └── Profile.jsx     # /profile and /u/:username
│       ├── components/         # AuthModal, AvatarPic, SparkleField, NavUser, cursors...
│       ├── data/               # genres.js, story.js, romance.js, stories.js
│       └── audio/sound.js      # procedural sound engine
└── backend/
    ├── .env.example
    └── src/
        ├── server.js           # starts the API
        ├── app.js              # middleware + routes
        ├── config/             # env.js, db.js (MongoDB Atlas)
        ├── models/             # User.js, Unlock.js
        ├── routes/             # auth.js, progress.js, stats.js, profile.js
        ├── middleware/         # auth.js (JWT check), error.js
        ├── data/               # endings.js, avatars.js
        └── utils/              # jwt.js, httpError.js
```

## 🧭 Routes

| Path | Page |
| --- | --- |
| `/` | Hub (all worlds) |
| `/genre/thriller` | Thriller landing page |
| `/genre/romance` | Rom-Com landing page |
| `/genre/scifi`, `/genre/horror` | Coming soon pages |
| `/play/thriller`, `/play/romance` | The story player |
| `/profile` | Your profile (needs login) |
| `/u/:username` | Public profile of any player |

## 🔌 API

| Method | Endpoint | Auth | What it does |
| --- | --- | :---: | --- |
| GET | `/api/health` | - | Server + database status |
| POST | `/api/auth/register` | - | Create account (username, avatar, email, password) |
| POST | `/api/auth/login` | - | Log in, returns a JWT |
| GET | `/api/auth/me` | JWT | Current user |
| GET | `/api/progress` | JWT | My unlocked endings |
| POST | `/api/progress/ending` | JWT | Save one unlocked ending |
| POST | `/api/progress/sync` | JWT | Merge guest endings after login |
| GET | `/api/stats/endings` | - | % of players who unlocked each ending |
| GET / PATCH | `/api/profile/me` | JWT | My profile / change avatar and username |
| GET | `/api/profile/:username` | - | Public profile (never shows email) |

## 🚀 Run it locally

You need Node 18+ and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

```bash
# 1. clone
git clone https://github.com/shama21parveen/choose_chaos.git
cd choose_chaos
```

**Backend** (terminal 1)

```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
# open .env and fill MONGO_URI and JWT_SECRET
npm run dev               # http://localhost:5000/api/health
```

| `.env` key | What to put |
| --- | --- |
| `MONGO_URI` | Atlas connection string, with `/choosechaos` after `.net` |
| `JWT_SECRET` | Any long random string (16+ characters) |
| `CLIENT_URL` | `http://localhost:5173` |

**Frontend** (terminal 2)

```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000
npm run dev
```

Open **http://localhost:5173** and pick your poison.

Production build: `npm run build` then `npm run preview`.

## ☁️ Deployment

The plan: **frontend on Vercel**, **backend on Render**, **database on MongoDB Atlas**. All three have free tiers.

```
 Browser ──► Vercel (React app) ──► Render (Express API) ──► MongoDB Atlas
```

### 1. Database: MongoDB Atlas

1. Create a free **M0** cluster
2. Create a database user (username + password)
3. **Network Access** → add `0.0.0.0/0` (Render uses changing IPs)
4. Copy the connection string, it goes into `MONGO_URI`

### 2. Backend: Render

1. Push the repo to GitHub
2. Render → **New → Web Service** → pick the repo
3. Settings:

| Field | Value |
| --- | --- |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

4. Add **Environment Variables**:

| Key | Value |
| --- | --- |
| `MONGO_URI` | your Atlas connection string |
| `JWT_SECRET` | a long random string |
| `CLIENT_URL` | your Vercel URL (for CORS) |
| `NODE_ENV` | `production` |

> The free Render plan sleeps after inactivity, so the first request can take around 30 seconds.

### 3. Frontend: Vercel

1. Vercel → **Add New → Project** → pick the repo
2. Settings:

| Field | Value |
| --- | --- |
| Root Directory | `frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

3. Add this **Environment Variable**:

| Key | Value |
| --- | --- |
| `VITE_API_URL` | your Render URL, e.g. `https://choose-chaos-api.onrender.com` |

4. Add `frontend/vercel.json` so deep links like `/genre/romance` do not 404 on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

5. Deploy, then copy the Vercel URL back into Render's `CLIENT_URL`.

### 4. Go live checklist

- [ ] Atlas cluster is up and the connection string works
- [ ] Render service shows **Live**, and `/api/health` responds
- [ ] `CLIENT_URL` on Render matches the Vercel URL exactly (no trailing slash)
- [ ] `VITE_API_URL` on Vercel points to the Render URL
- [ ] Refresh on `/genre/romance` works
- [ ] Register, log in, unlock an ending, log out and back in: the ending is still there
- [ ] Paste the live link at the top of this README

## 🔐 Security notes

- Passwords are hashed with **bcrypt**, never stored or returned in plain text
- Login returns a **JWT** (7 days); protected routes check it on every request
- Inputs are validated with **zod**; only known ending ids are accepted
- **Rate limiting** on the API and a stricter one on login/register
- **helmet** security headers and a **CORS** allow-list (only your frontend URL)
- Public profiles never expose email addresses

## 📝 How a story is written

Each story is a plain JavaScript object: a set of scenes, and every scene lists its choices.

```js
gate: {
  place: "Main Gate",
  time: "7:52 AM",
  mood: "sweet",          // controls music and sound
  art: "gate",            // background art
  sky: "butter",          // colour palette
  text: "Your first scene text...",
  choices: [
    { text: "Say sorry", next: "sorry", doubt: 0 },
    { text: "Secret choice", next: "secret", requires: 3 }, // needs meter >= 3
  ],
},
```

A scene with `ending: { id, title }` finishes the story and unlocks that ending.

## ➕ Add a new genre

1. Write the story in `src/data/` and register it in `stories.js`
2. Add one object to `src/data/genres.js` (colours, tagline, avatar, hook)
3. Optional: build a landing page in `src/pages/` and route it in `GenrePage.jsx`

## 🗺️ Roadmap

- [x] Story engine with timed choices, meters and endings
- [x] Thriller and Rom-Com stories
- [x] Multi-genre hub, genre pages, responsive design
- [x] Backend: register and login with JWT
- [x] Save unlocked endings to the database
- [x] "X% of players unlocked this ending" stats
- [ ] Deploy (Vercel + Render + Atlas)
- [ ] Sci-Fi story
- [ ] Horror story
- [ ] Story map and badges

## 👩‍💻 Author

**Shama Parveen**

[![GitHub](https://img.shields.io/badge/GitHub-shama21parveen-0a0405?style=for-the-badge&logo=github&logoColor=ffb347)](https://github.com/shama21parveen)
[![Email](https://img.shields.io/badge/Email-shama21parveen@gmail.com-0a0405?style=for-the-badge&logo=gmail&logoColor=ff3b3b)](mailto:shama21parveen@gmail.com)

<div align="center">

<br/>

*Built with a lot of chaos, a little sleep, and way too many endings.* 🔥

</div>