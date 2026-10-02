export interface ScrapbookCard {
  id: string;
  title: string;
  text: string;
  doodle?: string;
  rotation: number;
  date?: string;
}

export interface Memory {
  id: string;
  image: string;
  caption: string;
  rotation: number;
  tapeColor?: string;
}

export interface LoveLetterData {
  girlfriendName: string;
  birthday: string;
  intro: {
    title: string;
    subtitle: string;
    callout: string;
  };
  cards: ScrapbookCard[];
  memories: Memory[];
  mainLetter: {
    title: string;
    paragraphs: string[];
    signature: string;
    ps: string;
  };
  finalMessage: {
    line1: string;
    line2: string;
    date: string;
  };
}

export const loveLetter: LoveLetterData = {
  girlfriendName: "My Love",
  birthday: "03 • 10 • 2026",

  intro: {
    title: "Happy Birthday, ❤️",
    subtitle: "Before you read this,\nI want you to know one thing...",
    callout: "This isn't just a birthday wish.\n\nIt's a little piece of my heart."
  },

  cards: [
    {
      id: "01",
      title: "How it started",
      text: "From simple conversations to moments that changed everything. I never knew that meeting you would become the best part of my story.",
      doodle: "sparkle",
      rotation: -1.5,
      date: "The Beginning"
    },
    {
      id: "02",
      title: "Things I love about you",
      text: "The way your eyes light up when you laugh, your warmth, how deeply you care, and how effortlessly you make every quiet moment feel special.",
      doodle: "heart",
      rotation: 1.2,
      date: "Always"
    },
    {
      id: "03",
      title: "The little things",
      text: "Late night calls, silly inside jokes, shared sugar free tea cups, random voice notes, and how you somehow always know how to make me smile.",
      doodle: "coffee",
      rotation: -2.1,
      date: "Everyday Magic"
    },
    {
      id: "04",
      title: "Us",
      text: "Through every high, every low, every silly argument and warm tight hug stickers — there's nowhere else in the world I'd rather be.",
      doodle: "infinity",
      rotation: 1.8,
      date: "Forever & Always"
    }
  ],

  memories: [
    {
      id: "1",
      image: "/memories/01.jpg",
      caption: "That sunset afternoon we never wanted to end ✨",
      rotation: -3,
      tapeColor: "pink"
    },
    {
      id: "2",
      image: "/memories/02.jpg",
      caption: "Laughing so hard our stomachs hurt 🤍",
      rotation: 2.4,
      tapeColor: "cream"
    },
    {
      id: "3",
      image: "/memories/03.jpg",
      caption: "Our spontaneous coffee date adventure ☕",
      rotation: -1.8,
      tapeColor: "rose"
    },
    {
      id: "4",
      image: "/memories/04.jpg",
      caption: "The moment I knew you were the one 🌹",
      rotation: 3.2,
      tapeColor: "gold"
    },
    {
      id: "5",
      image: "/memories/05.jpg",
      caption: "Quiet cozy evenings just talking for hours 🌙",
      rotation: -2.5,
      tapeColor: "clip"
    },
    {
      id: "6",
      image: "/memories/06.jpg",
      caption: "Making memories we'll cherish forever 💫",
      rotation: 1.5,
      tapeColor: "pink"
    }
  ],

  mainLetter: {
    title: "Happy Birthday, My Love",
    paragraphs: [
      "Happy Birthday to the person who somehow became such an important part of my life.",
      "I hope today gives you all the happiness, smiles and little moments that you deserve.",
      "I know I may not always say everything perfectly, but I hope you know how much you mean to me.",
      "Thank you for all the laughs, conversations, memories, silly fights and all the little moments that somehow became my favourite memories.",
      "Life with you isn't always perfect.",
      "And honestly, I don't want it to be.",
      "I want the real thing.",
      "The stupid jokes.\nThe random conversations.\nThe arguments.\nThe making up.\nThe memories we haven't made yet.",
      "And most importantly...",
      "I want to keep being there.",
      "Today is your day.",
      "Eat your favourite food.\nSmile a little extra.\nLaugh a little louder.\nAnd make memories that you'll remember for years.",
      "Happy Birthday, my love."
    ],
    signature: "— Varun",
    ps: "I'll always be there to irritate you."
  },

  finalMessage: {
    line1: "I will always be there to irritate U.",
    line2: "And love you.",
    date: "03 • 10 • 2026"
  }
};
