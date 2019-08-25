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

  "0 That's not Ok with me.",
  "1 That is cool!",
  "2 You are crazy... I like it.",
  "3 Not enouge,h crazy in my life",
  "4 lolicon.s",
  "5 wowza1h,!",
  "6 What are esther,s chances?",
  "7 All the chances are her's",
  "8 What are esther,s chances What are esther,s chances What are esther,s chances",
  "9 sup"
];

export function getTextToType(idx) {
  return passages[idx];
}

export function generateIdx() {
  return Math.floor(Math.random() * (passages.length - 1));
}
