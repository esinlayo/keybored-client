import React, { useEffect } from 'react'

const passages = [
  "It takes a courageous fool to say things that have not been said and to do things that have not been done.",
  "If you live to be 100, I hope I live to be 100 minus 1 day, so I never have to live without you.",
  "What you do not want done to yourself, do not do to others.",
  "Youth is the best time to be rich; and the best time to be poor.",
  "Time is a funny thing. You can go through it and meddle with it, but nothing can stay permanent.",
  "You have the right to be wrong. For how long, who knows?",
  "Uncharted territory is a good place to be in. You can draw all over it.",
  "Poetic talent is really easy to fake when thy sentences doth no sense make.",
  "When life gets you down, make a comforter. Then take a happy nap.",
  "If Jesus can walk on water, can he swim on land?",
  "What do you call a kid with no arms and an eyepatch? Names.",
  "It's kind of fun to do the impossible. Do it impossibly.",
  "There is no pleasure in having nothing to do; the fun is having lots to do and not doing it.",
  "Life is either a daring adventure or nothing at all.",
  "All life is an experiment. The more experiments you make the better.",
  "It's so simple to be wise... just think of something stupid to say and then don't say it.",
  "If you are not willing to risk the unusual, you will have to settle for the ordinary.",
  "The risk of a wrong decision is preferable to the terror of indecision.",
  "There's something liberating about not pretending. Dare to embarrass yourself. Risk.",
  "To win without risk is to triumph without glory.",
  "Man cannot discover new oceans unless he has the courage to lose sight of the shore.",
  "Weaseling out of things is important to learn. It's what separates us from the animals...except the weasel."
];

export function getTextToType(idx) {
  return passages[idx];
}

export function generateIdx(oldIdx) {
  let newIdx = Math.floor(Math.random() * (passages.length))
  if (oldIdx !== undefined) { while (newIdx === oldIdx) newIdx = Math.floor(Math.random() * (passages.length)) }
  return newIdx;
}

const adjectives = [
  "Cute",
  "Smol",
  "Huge",
  "Elusive",
  "Magestic",
  "Thundrous",
  "Voluptuous",
  "Sworn",
  "Sir",
  "Madam",
  "Top Notch",
  "Top",
  "Nice"
];
const beings = [
  "Meme",
  "Overlord",
  "Lord",
  "Ice Cream",
  "Booger",
  "Hackerman",
  "Clown",
  "Train",
  "Trainwreck",
  "Popsicle",
  "Pickle",
  "Bagel",
  "Flower",
  "Underlord",
  "Underling",
  "Duckling",
  "Van"
];

export function generateRandomLeaderboardName() {
  const adj = adjectives[Math.floor(Math.random() * (adjectives.length))];
  const being = beings[Math.floor(Math.random() * (beings.length))];
  return `${adj} ${being}`;
}

export function Analytics({ page_name, page_group }) {
  var wtsh = {};

  wtsh['invisible'] = '#';
  wtsh['text_counter'] = '#';
  wtsh['page_name'] = page_name === undefined ? '#' : page_name;
  wtsh['page_group'] = page_group === undefined ? '#' : page_group;
  wtsh['conversion_number'] = '#';

  var wts = document.createElement('script');
  wts.type = 'text/javascript';
  wts.async = true;
  wts.src = 'https://wts.one/3/1908330/log6_2.js';

  useEffect(() => { document.getElementById('wts1908330').appendChild(wts) })

  return (<span id="wts1908330">&nbsp;</span>)
}