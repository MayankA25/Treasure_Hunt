import { players } from "./temp.js";

export const getTeamName = () => {
  const genNames = [];
  const names = [
    "The Gold Diggers 🏆🔎",
    "Hidden Clue Hunters 🗺️🔍",
    "The Lost Explorers 🏝️🧭",
    "X Marks the Spot ❌🏴‍☠️",
  ];

  while (genNames.length !== players.length) {
    const name = names[Math.floor(Math.random() * players.length)];
    if (genNames.indexOf(name) === -1) {
      genNames.push(name);
    } else {
      continue;
    }
  }

  return genNames;
};

// console.log(getTeamName())

const asciiToAlpha = (asciiArray) => {
  return String.fromCharCode(...asciiArray);
};

export const getPassword = () => {
  let asciiArray = [];
  while (asciiArray.length < 5) {
    const value = 64 + Math.ceil(Math.random(0, 1) * 26);
    asciiArray.push(value);
  }
  // return asciiArray;
  asciiArray.push(64);

  while (asciiArray.length < 10) {
    const value = 47 + Math.ceil(Math.random(0, 1) * 9);
    asciiArray.push(value);
  }

  return asciiToAlpha(asciiArray);
};

export const updatePlayers = () => {
  const names = getTeamName()
  for (let i = 0; i < players.length; i++) {
    players[i].teamName = names[i],
    players[i].secretPasscode = getPassword()
  }
};

// updatePlayers();
// // console.log(getTeamName())
// console.log(players)
