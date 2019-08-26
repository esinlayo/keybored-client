const passages = [
  /*
  "It's so important to realize that every time you get upset, it drains your emotional energy.",
  "Losing your cool makes you tired. Getting angry a lot messes with your health.",
  "True rebels hate their own rebellion. They know by experience that it is not a cool and glamorous lifestyle",
  "it takes a courageous fool to say things that have not been said and to do things that have not been done.",
  "Miss Mary Mack, Mack, Mack, all dressed in black, black, black. She has a knife, knife, knife, stuck in her back, back, back.",
  "She cannot breathe, breathe, breathe. She cannot cry, cry, cry. Thats why she begs, begs, begs. She begs to die, die ,die..",
  "I'll come and make love to you at five o'clock. If I'm late start without me.",
  "It's so trendy, almost bleeding to death. All the cool girls are doing it."
  */

  "If you live to be 100, I hope I live to be 100 minus 1 day, so I never have to live without you.",
  "What you do not want done to yourself, do not do to others.",
  "Youth is the best time to be rich; and the best time to be poor.",
  "Time is a funny thing. You can go through it and meddle with it, but nothing can stay permanent.",
  "You have the right to be wrong.",
  "Uncharted territory is a good place to be in.",
  "Poetic talent is really easy to fake when thy sentences doth no fucking sense make",
  "When life gets you down, make a comforter.",
  "If Jesus can walk on water can he swim on land?",
  "What do you call a kid with no arms and an eyepatch? Names.",
  "Quotes are for dumb people who can't think of something intelligent to say on their own."

  /*
  "What do you call a kid with no arms and an eyepatch? Names. What do you call a kid with no arms and an eyepatch? Names."
  */
];

export function getTextToType(idx) {
  return passages[idx];
}

export function generateIdx() {
  return Math.floor(Math.random() * (passages.length - 1));
}
