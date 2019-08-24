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
  */ "wow0",
  "wow1",
  "wow2",
  "wow3",
  "wow4",
  "wow5",
  "wow6",
  "wow7",
  "wow8"
];

export function getTextToType(idx) {
  return passages[idx];
}

export function generateIdx() {
  return Math.floor(Math.random() * (passages.length - 1));
}
