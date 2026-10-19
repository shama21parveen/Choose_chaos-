// "Crush Hour" - enemies-to-lovers high-school rom-com (K-drama vibe, Gen Z energy).
// You crash into the Student Council President on day 1. You hate each other.
// Then: banana milk wars, a basketball to the nose, one bus shelter... and feelings.
//
// Spark meter (0-9): goes up when you are brave, funny or honest.
//   - Rooftop truth option needs Spark 5.   - Secret confession needs Spark 8.
// `art` = which sticker collage / location, `sky` = pastel colours (see RomanceBackdrop.jsx).

const base = { particles: "hearts", fog: 0 };

export const romance = {
  id: "crush-hour",
  title: "Crush Hour",
  start: "gate",
  theme: {
    meter: "Spark",
    meterMax: 9,
    soft: true, // pastel UI, centered story card, cute sounds
    glitch: false,
    heartbeat: false,
    torch: false,
    accent: "soft",
    typing: "soft",
  },
  scenes: {
    /* ---------- ACT 1: THE CRASH ---------- */
    gate: {
      ...base,
      mood: "flutter",
      art: "gate",
      sky: "butter",
      place: "Main Gate",
      time: "7:52 AM · Day 1 of senior year",
      text: "RULES FOR THE FIRST DAY OF SENIOR YEAR:\n1. Be early.\n2. Look effortlessly cool.\n3. Do NOT draw attention to yourself.\n\nYou break all three in ninety seconds. You are late, toast in your mouth, iced coffee in your hand, when a boy on a skateboard shoots around the corner. CRASH. Coffee in the air. Books in the air. Your dignity, also in the air. When the world stops spinning, there is a boy on the ground, a white shirt that is now very brown, and a very angry voice: 'Do you know how much this shirt costs?!'",
      choices: [
        { label: "Shout: 'You came out of NOWHERE, skateboard guy!'", next: "argue" },
        { label: "Offer him your toast as an apology", next: "toast", doubt: 1 },
      ],
    },

    argue: {
      ...base,
      mood: "flutter",
      art: "gate",
      sky: "butter",
      place: "Main Gate",
      time: "7:55 AM",
      text: "He stands up, dripping coffee, and you finally see his face. Sharp eyebrows. Messy hair. A badge on his jacket that says STUDENT COUNCIL PRESIDENT.\n\n'Rule four,' he says coldly. 'No skateboards inside the gate.'\n'And no coffee murder,' you say. 'Rule one.'\n'That is not a rule.'\n'It is now.'\n\nHe takes out a tiny notebook and writes your name. 'Late. Loud. Caffeinated. I am watching you.' The first bell rings. He walks away like he won. He did not win.",
      choices: [
        { label: "Stick your tongue out at his back", next: "homeroom" },
        { label: "Yell: 'Sorry about the shirt!' (you mean it, a tiny bit)", next: "homeroom", doubt: 1 },
      ],
    },

    toast: {
      ...base,
      mood: "flutter",
      art: "gate",
      sky: "butter",
      place: "Main Gate",
      time: "7:55 AM",
      text: "He stares at the toast. Then at you. 'Is this... toast?'\n'It is an apology toast.'\n'It has a bite taken out of it.'\n'That was BEFORE the crash. It is still a valid toast.'\n\nHe opens his mouth to argue. Then he closes it. One corner of his lips twitches. Just once. Then it is gone. 'Cold toast,' he says. 'Terrible apology.' But he does not give it back. He just walks away, holding your toast like it is evidence. The first bell rings.",
      choices: [
        { label: "Walk away like you won the argument", next: "homeroom" },
        { label: "Call out: 'You are welcome!'", next: "homeroom", doubt: 1 },
      ],
    },

    homeroom: {
      ...base,
      mood: "sweet",
      art: "classroom",
      sky: "sage",
      place: "Class 3-B",
      time: "8:30 AM",
      text: "Plot twist number one: Mina is waving at you from the back row like she is landing a plane.\nPlot twist number two: Mr. Rao is reading a new seating chart. 'Seat 17... and seat 18.'\n\nSeat 18 is already taken. By a boy in a gym jacket who smells faintly of coffee. Jun Han. Student Council President. Your sworn enemy of ninety minutes.\n\n'Of course,' he mutters. 'Of course,' you mutter back.\n\nThen Mr. Rao smiles. 'Seat partners are also festival committee partners. Congratulations!'",
      choices: [
        { label: "Beg Mr. Rao for a new seat", next: "seat" },
        { label: "Accept your doom with a dramatic sigh", next: "canteen", doubt: 1 },
      ],
    },

    seat: {
      ...base,
      mood: "flutter",
      art: "classroom",
      sky: "sage",
      place: "Mr. Rao's Desk",
      time: "8:52 AM",
      text: "You rush to the front. 'Sir, please. I cannot sit next to him. He is a menace.'\n\nJun appears right behind you. 'Sir, she is a hazard.'\n\nMr. Rao looks at both of you for a very long time. 'Interesting. You agree on something. That is already teamwork.'\n\nYou are running out of options. In your bag, there is a very good lunchbox. And Mr. Rao does look hungry.",
      choices: [
        { label: "Bribe him with your lunchbox", next: "ending1" },
        { label: "Give up with dignity", next: "canteen", doubt: 1 },
      ],
    },

    /* ---------- ACT 2: THE WAR ---------- */
    canteen: {
      ...base,
      mood: "sweet",
      art: "canteen",
      sky: "peach",
      place: "School Canteen",
      time: "12:40 PM",
      text: "Mina has a full report. 'Jun Han. Student Council President since freshman year. Never smiles. Never loses. Never lets anyone borrow his pen.'\n'He ruined my coffee.'\n'He ruined your coffee,' Mina agrees, with noodles in her mouth. 'Also, he is looking at you.'\n\nYou turn around. Jun is at the vending machine, staring at the last banana milk. The one you were about to buy. Your eyes meet. You both move at the exact same time.",
      choices: [
        { label: "Dive for the last banana milk", next: "milk", doubt: 1 },
        { label: "Let him have it (you are the bigger person) (you are NOT)", next: "library" },
      ],
    },

    milk: {
      ...base,
      mood: "cheer",
      art: "canteen",
      sky: "peach",
      place: "School Canteen",
      time: "12:43 PM",
      text: "Four hands. One carton. Nobody lets go.\n'Let GO!'\n'YOU let go!'\nSqueeze. POP. Banana milk explodes over both of you. The whole canteen goes dead silent.\n\nJun, dripping from hair to shoes, closes his eyes. 'Second shirt today,' he says softly.\nMina, from the corner: 'I am filming.'\n\nAnd then, impossibly, Jun starts to laugh. A real laugh. A dimple appears on his left cheek. You forget to be angry for exactly three seconds.",
      choices: [
        { label: "Hand him your napkins, still laughing", next: "library", doubt: 1 },
        { label: "Run out of the canteen. Immediately.", next: "library" },
      ],
    },

    library: {
      ...base,
      mood: "dreamy",
      art: "library",
      sky: "sage",
      place: "The Library",
      time: "4:15 PM",
      text: "Festival committee, day one. The poster is due tomorrow. You and Jun sit at opposite corners of the same table, glaring at one blank paper.\n\n'Let us do a star theme,' you say.\n'Stars are cliche.'\n'Your face is cliche.'\n'That does not even make sense.'\n\nSilence. Then he pushes up his glasses and starts to draw. In five minutes, a tiny perfect festival appears on the paper. Lanterns. Fairy lights. And a very small girl with a coffee cup. 'That is you,' he says, not looking up. 'For scale.' Your heart does something very rude.",
      choices: [
        { label: "Say: 'Fine. Truce. For the festival only.'", next: "jun1", doubt: 1 },
        { label: "Say: 'Nobody asked you to be good at this.'", next: "jun1" },
      ],
    },

    /* ---------- INTERLUDE: HIS SIDE ---------- */
    jun1: {
      ...base,
      mood: "dreamy",
      art: "notes1",
      sky: "rose",
      place: "Jun's Notes App",
      time: "11:48 PM · meanwhile...",
      text: "MEANWHILE, in a very quiet bedroom across town, a phone screen glows.\n\nDay 1: Girl crashed into me. Ruined shirt.\nDay 1 (later): Girl stole my banana milk.\nDay 2: Why do I keep looking at row three?\nDay 3: She laughs with her whole face. Not that I noticed.\nDay 3 (again): Delete this note.\nDay 3 (again again): Do NOT delete this note.\n\nJun stares at the ceiling. 'I am not,' he tells it, 'a person who likes the girl who crashed into him.' The ceiling says nothing. The ceiling knows.",
      choices: [{ label: "Next day...", next: "court" }],
    },

    court: {
      ...base,
      mood: "cheer",
      art: "court",
      sky: "peach",
      place: "The Court",
      time: "5:10 PM · Thursday",
      text: "You are waiting for Mina at the basketball court when you hear it: 'HEADS UP!'\n\nA ball flies straight at your face. Jun dives in front of you at the very last second and takes it. Right on the nose. He sits down hard.\n\n'Are you okay?!'\n'I am the Student Council President,' he says in a squeaky voice. 'I am always okay.'\n\nHis nose is turning red like a tiny tomato. You try so hard not to laugh. You fail. He glares. Then he laughs too, and for one second, in the golden afternoon light, you notice his eyelashes.",
      choices: [
        { label: "Press your cold banana milk on his nose (you carry a spare now)", next: "rain", doubt: 1 },
        { label: "Laugh until you cry", next: "rain" },
      ],
    },

    rain: {
      ...base,
      mood: "dreamy",
      art: "rain",
      sky: "dusk",
      place: "Bus Stop",
      time: "6:20 PM",
      text: "The sky opens like someone pressed a button. You and Jun run for the same tiny bus shelter. Of course. Your umbrella is broken. His hoodie is soaked. The bus is twenty minutes late.\n\n'Why are you being nice to me?' you finally ask.\n'I am not nice.'\n'You gave me your jacket.'\n'You were shivering. It is called basic human decency.'\n\nThe rain gets louder. His shoulder is warm. Neither of you moves away. He holds out one earphone without looking at you. 'The song is bad,' he says. 'Take it anyway.'",
      choices: [
        { label: "Take the earphone", next: "jun2", doubt: 1 },
        { label: "Refuse. Stay stubborn.", next: "ending6" },
      ],
    },

    jun2: {
      ...base,
      mood: "dreamy",
      art: "notes2",
      sky: "rose",
      place: "Jun's Notes App",
      time: "11:52 PM · meanwhile, again...",
      text: "MEANWHILE...\n\nDay 6: She took my earphone. She hummed the wrong lyrics. I did not correct her.\nDay 6 (later): Mina asked why I was smiling at a wall. I said it was a nice wall.\nDay 6 (again): The wall is not nice. I am just in trouble.\n\nJun types one line, deletes it, types it again, deletes it. Finally, he saves it: 'I think I like her.' Then he turns his phone face down and screams softly into a pillow.",
      choices: [{ label: "Meanwhile, in your room...", next: "realize" }],
    },

    /* ---------- ACT 3: THE REALIZATION ---------- */
    realize: {
      ...base,
      mood: "dreamy",
      art: "bedroom",
      sky: "dusk",
      place: "Your Bedroom",
      time: "12:30 AM",
      text: "You are lying in bed, staring at the ceiling. Mina's text glows on your screen: 'hate = love 🙄'\n\n'NO,' you type. 'He is the worst. He is arrogant. He ruined my coffee. He laughs like... like...'\n\nYou stop typing. You are smiling at your phone. You think about the dimple. The earphone. The nose like a tiny tomato. 'Oh no,' you whisper. 'OH NO.'\n\nYour phone buzzes. A message from an unknown number: 'Poster colour: pink or green? - J'",
      choices: [
        { label: "Reply: 'Why do you have my number??'", next: "festival" },
        { label: "Reply: 'Pink. Obviously. ...Are you awake?'", next: "festival", doubt: 1 },
      ],
    },

    festival: {
      ...base,
      mood: "cheer",
      art: "festival",
      sky: "dusk",
      place: "School Festival",
      time: "7:00 PM · Friday night",
      text: "Fairy lights. Music. A hundred lanterns. The poster you two made hangs over the entrance: pink. Mina is handing out cotton candy and making heart eyes at you from across the courtyard.\n\nJun walks up in a clean white shirt. 'Third shirt this week,' he says. 'I am running out of white shirts.'\n'You could try not being a menace.'\n'You could try not crashing into people.'\n\nBehind him, a tall senior waves at you. 'Hey! Want to take a photo together?' Jun's jaw tightens like a very small volcano.",
      choices: [
        { label: "Drag Jun into the photo booth and wave the senior off", next: "ending3" },
        { label: "Tease: 'Are you jealous, Council President?'", next: "rooftop", doubt: 1 },
        {
          label: "Take his hand: 'I like you. Even though you are the worst.'",
          next: "ending5",
          requires: 8,
          secret: true,
        },
      ],
    },

    rooftop: {
      ...base,
      mood: "dreamy",
      art: "rooftop",
      sky: "dusk",
      place: "School Rooftop",
      time: "9:10 PM",
      text: "The festival is loud, far below. Up here it is only the moon, a few fairy lights, and a boy who cannot look at you.\n\n'I have a confession,' Jun says. He holds out his phone. A note is open. The title says: 'Things I Did Not Plan.'\n\n1. The crash.\n2. The banana milk war.\n3. Falling for the coffee girl.\n\nHis ears are bright red. 'I am a very good President,' he says quietly. 'But I am terrible at this part.'",
      choices: [
        { label: "Take his phone and type: 'Item 4: Her too.'", next: "ending4", requires: 5 },
        { label: "Hide behind a joke: 'Third shirt. Impressive.'", next: "ending2" },
      ],
    },

    /* ---------- ENDINGS ---------- */
    ending1: {
      ...base,
      mood: "cheer",
      art: "library",
      sky: "sage",
      place: "Detention Room",
      time: "4:30 PM",
      ending: { id: "r1", title: "Detention Duo" },
      text: "Bribing a teacher: bad idea. Detention for both of you. Your punishment: clean every shelf in the library. Together. In silence. For two hours.\n\nAt minute 47, you sneeze. He says 'Bless you' without looking up. At minute 90, you laugh at the same silly book title at the exact same time. At minute 119, he says, 'This is the worst day of my life.' He is smiling.\n\nDetention Duo. Officially.",
    },

    ending2: {
      ...base,
      mood: "dreamy",
      art: "rooftop",
      sky: "dusk",
      place: "Rooftop, Later",
      time: "10:00 PM",
      ending: { id: "r2", title: "Almost, Maybe" },
      text: "You laugh too loudly. He laughs too. The moment is gone, and also not gone at all.\n'Third shirt,' you say. 'Impressive.'\n'Thank you,' he says. 'I worked very hard.'\n\nYou stay up there until the lights go out. Before you leave, he says, 'Tomorrow. Same rooftop?'\n'Maybe,' you say.\n'Maybe is good,' he says.\n\nYou both know it is a yes.",
    },

    ending3: {
      ...base,
      mood: "cheer",
      art: "photo",
      sky: "rose",
      place: "The Photo Booth",
      time: "8:00 PM",
      ending: { id: "r3", title: "Photo Strip" },
      text: "Four flashes.\nIn the first photo, you are both scowling.\nIn the second, he is trying not to laugh.\nIn the third, he is laughing for real and you are staring at his dimple.\nIn the fourth, he is staring at you.\n\nThe strip comes out warm and a little crooked. Jun folds it carefully and puts it in his wallet, next to his student ID. 'Evidence,' he says. 'Of what?' 'That you were in my photo booth.' The tall senior has left. You did not even notice.",
    },

    ending4: {
      ...base,
      mood: "cheer",
      art: "rooftop",
      sky: "dusk",
      place: "Item 4",
      time: "9:20 PM",
      ending: { id: "r4", title: "Item 4: Her Too" },
      text: "You take his phone and type with shaking fingers: 'Item 4: Her too.'\n\nJun reads it once. Twice. Three times. Then he covers his whole face with both hands. 'I am the Student Council President,' he mumbles. 'I am supposed to be calm.'\n\nYou pull his hands down. He is smiling so wide that his dimple has a dimple. Below, the fireworks start. From the courtyard, Mina screams: 'I KNEW IT! HATE EQUALS LOVE!'\n\nHis hand is in yours. Best plot twist of senior year. And it started with one spilled coffee.",
    },

    ending5: {
      ...base,
      mood: "cheer",
      art: "confession",
      sky: "dusk",
      place: "Under the Fairy Lights",
      time: "7:20 PM",
      ending: { id: "r5", title: "Seen. And Replied." },
      text: "'I like you,' you say, before your brain can stop you. 'Even though you are the worst.'\n\nThe music seems to fade. Jun blinks. 'You,' he says slowly, 'just beat me to it. I had a speech. Three pages. Colour coded.'\n'Read it,' you say.\n'Absolutely not,' he says, turning red.\n\nThen he takes out his phone and sends one message to the whole class group: 'Seen. Replied. Also, I like her too. Please stop screaming.' Thirty-one phones buzz at the same time. Mina screams. You cannot stop smiling.",
    },

    ending6: {
      ...base,
      mood: "dreamy",
      art: "rain",
      sky: "dusk",
      place: "The Second Umbrella",
      time: "6:45 PM",
      ending: { id: "r6", title: "The Second Umbrella" },
      text: "You refuse the earphone. Stubborn. Jun sighs, reaches into his bag, and pulls out a folded umbrella.\n\n'You HAD an umbrella?!'\n'Yes.'\n'This whole time?!'\n'You looked cold.'\n'Then why did we stand here for twenty minutes?!'\n\nHe opens it over both of you and finally smiles. 'Because it was raining,' he says. 'And I was not ready to go home yet.' You are speechless. He is looking at the road. The rain keeps tapping. The umbrella is small. Nobody complains.",
    },
  },
};
