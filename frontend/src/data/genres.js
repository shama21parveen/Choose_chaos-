// Every "world" (genre) on the Choose Chaos hub lives here.
// To add a new genre: add one object below and write its story in data/stories.js.
//
//  id        -> URL: /genre/<id>
//  storyKey  -> key in data/stories.js, URL: /play/<storyKey> (null = coming soon)
//  char      -> avatar kind (components/Avatars.jsx)
//  rgb/altRgb-> same colours as "r,g,b" so we can use them inside rgba()

export const genres = [
  {
    id: "thriller",
    name: "Psychological Thriller",
    short: "Thriller",
    tagline: "Trust nobody. Not even yourself.",
    blurb:
      "A hill town drowned in fog. A sister who stopped replying. One question follows you into every choice: who is really missing?",
    mood: "Dark · Tense · Twisty",
    ready: true,
    storyKey: "thriller",
    storyTitle: "Left on Read",
    char: "detective",
    color: "#34d399",
    alt: "#ef4444",
    rgb: "52,211,153",
    altRgb: "239,68,68",
    minutes: "12-15",
    hook: "Your sister sends one message: \"come soon.\" Then her phone goes dark. In a fog-soaked hill town every smile hides a lie, the police are too friendly, and your own Doubt starts whispering. How much do you trust yourself?",
    bullets: [
      "Timed choices: hesitate and the story chooses for you",
      "A Doubt meter that bends the story and speeds up your heartbeat",
      "One secret ending that most players never find",
    ],
  },
  {
    id: "romance",
    name: "Rom-Com",
    short: "Romance",
    tagline: "Crash into your enemy. Fall for him anyway.",
    blurb:
      "Day one of senior year. One spilled coffee. One very annoyed Student Council President. Banana milk wars and feelings nobody planned.",
    mood: "Cute · Funny · Cozy",
    ready: true,
    storyKey: "romance",
    storyTitle: "Crush Hour",
    char: "pair",
    color: "#ff7a9c",
    alt: "#ffc08a",
    rgb: "255,122,156",
    altRgb: "255,192,138",
    minutes: "15-20",
    hook: "Day one of senior year and you crash into the Student Council President. He is not smiling. What follows is a bribery attempt, a basketball to the nose, one very public embarrassment, and a feeling you absolutely refuse to name.",
    bullets: [
      "K-drama school life: rooftops, festivals, umbrella moments",
      "A Spark meter that grows with every brave (or silly) choice",
      "6 different endings, some sweet and some chaotic",
    ],
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    short: "Sci-Fi",
    tagline: "Space is quiet. Too quiet.",
    blurb:
      "A silent station, a ship that talks back, and a choice that rewrites the timeline. This world is still being built.",
    mood: "Neon · Lonely · Mind-bending",
    ready: false,
    storyKey: null,
    storyTitle: "Opening soon",
    char: "astronaut",
    color: "#22d3ee",
    alt: "#3b82f6",
    rgb: "34,211,238",
    altRgb: "59,130,246",
    minutes: "?",
    hook: "A silent space station. A ship's AI that remembers things you never told it. One choice that rewrites the timeline, and you are the only one who remembers the old one.",
    bullets: [
      "Choices that rewrite the timeline",
      "A ship AI with a mind of its own",
      "Currently being built. Check back soon.",
    ],
  },
  {
    id: "horror",
    name: "Horror",
    short: "Horror",
    tagline: "Don't look behind you.",
    blurb:
      "Old houses, wrong doors, and something that knows your name. This world is still being built.",
    mood: "Creepy · Slow-burn · Loud silence",
    ready: false,
    storyKey: null,
    storyTitle: "Opening soon",
    char: "ghost",
    color: "#ff4d4d",
    alt: "#fb923c",
    rgb: "255,77,77",
    altRgb: "251,146,60",
    minutes: "?",
    hook: "An old house with one door too many. Footsteps that stop when you stop. Something in the walls knows your name, and it is very patient.",
    bullets: [
      "Slow-burn dread with loud silence",
      "Doors that were not there a minute ago",
      "Currently being built. Check back soon.",
    ],
  },
];

export const genreById = (id) => genres.find((g) => g.id === id);

// glow colours used by the hub background when a genre is hovered
export const glowOf = (g) =>
  g
    ? { "--ga": `rgba(${g.rgb},0.30)`, "--gb": `rgba(${g.altRgb},0.20)` }
    : {};
