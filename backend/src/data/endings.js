// Every ending that exists in the stories. The server only accepts ids from this list.
// When you add a new story or ending in the frontend, add its id here too.
export const ENDINGS = {
  thriller: ["e1", "e2", "e3", "e4"],
  romance: ["r1", "r2", "r3", "r4", "r5", "r6"],
};

// endingId -> storyId   (e.g. "r3" -> "romance")
export const ENDING_TO_STORY = Object.fromEntries(
  Object.entries(ENDINGS).flatMap(([story, ids]) => ids.map((id) => [id, story]))
);

export const isValidEnding = (id) => Object.hasOwn(ENDING_TO_STORY, id);
