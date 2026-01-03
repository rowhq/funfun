export const galleries = [
  {
    slug: "ballet",
    name: "Ballet",
    description: "Twirls, tutus, and tiny dance steps",
    color: "pink",
    emoji: "🩰",
    images: [
      { id: 1, alt: "Ballet pose 1" },
      { id: 2, alt: "Ballet pose 2" },
      { id: 3, alt: "Ballet pose 3" },
      { id: 4, alt: "Ballet pose 4" },
      { id: 5, alt: "Ballet pose 5" },
      { id: 6, alt: "Ballet pose 6" },
    ],
  },
  {
    slug: "princess",
    name: "Princess",
    description: "Tiaras, dresses, and royal moments",
    color: "purple",
    emoji: "👑",
    images: [
      { id: 1, alt: "Princess moment 1" },
      { id: 2, alt: "Princess moment 2" },
      { id: 3, alt: "Princess moment 3" },
      { id: 4, alt: "Princess moment 4" },
      { id: 5, alt: "Princess moment 5" },
      { id: 6, alt: "Princess moment 6" },
    ],
  },
  {
    slug: "adventures",
    name: "Adventures",
    description: "Everyday magic and fun times",
    color: "blue",
    emoji: "✨",
    images: [
      { id: 1, alt: "Adventure 1" },
      { id: 2, alt: "Adventure 2" },
      { id: 3, alt: "Adventure 3" },
      { id: 4, alt: "Adventure 4" },
      { id: 5, alt: "Adventure 5" },
      { id: 6, alt: "Adventure 6" },
    ],
  },
];

export const milestones = [
  {
    age: "6 months",
    title: "First Smile",
    emoji: "😊",
  },
  {
    age: "1 year",
    title: "First Steps",
    emoji: "👣",
  },
  {
    age: "18 months",
    title: "First Tutu",
    emoji: "🩰",
  },
  {
    age: "2 years",
    title: "Ballet Princess",
    emoji: "👑",
  },
];

export const aboutNoulie = {
  name: "Noulie",
  age: "2 years old",
  title: "Ballet Princess",
  favorites: [
    { label: "Color", value: "Pink", emoji: "💖" },
    { label: "Activity", value: "Ballet", emoji: "🩰" },
    { label: "Animal", value: "Unicorn", emoji: "🦄" },
    { label: "Food", value: "Strawberries", emoji: "🍓" },
  ],
  funFacts: [
    "Loves to twirl until she gets dizzy",
    "Has a special tutu for every day of the week",
    "Best friends with her teddy bear, Mr. Snuggles",
    "Can count to ten in two languages",
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/galleries", label: "Galleries" },
  { href: "/about", label: "About Noulie" },
  { href: "/family", label: "Family" },
];
