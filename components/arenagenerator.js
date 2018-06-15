const dice = require('./dice');
const monsters = require('./monsters');
const clone = require('clone');

// basicly works but there is some problem with, the random generator.
// A lvl input and difficulty is needed and maybe full charsheet.
// Difficulty: integer 1-3

// Choose a random group of enemies.
const choosePool = () => {
  let x = dice.roll(1, 3);
  let pool;
  if (x === 1) {
    pool = monsters.beastList;
  } else if (x === 2) {
    pool = monsters.undeadList;
  } else if (x === 3) {
    pool = monsters.humanoidList;
  }
  return pool;
};

// Calculate sum CR
const sumCR = (difficulty, lvl) => {
  let sumCR = (difficulty * 0.25) * lvl;
  return sumCR;
};

// Take random monster from type till CR === Monsters CR; Every monster sould make random vals.
const genPop = (sumCR) => {
  let population = [];
  let type = choosePool();
  let popCR = 0;
  let monster;
  let remCR = sumCR;

  for (let i = 0; i < 8; i++) {
    // pick a monster object from list, clone and add to pop
    monster = type.filter(monster => monster.CR <= remCR);
    population[i] = clone(monster[dice.randomIndex(monster)]);
    // generate fix HP
    population[i].HP = population[i].HP();

    if (population[i] === undefined) {
      break;
    } // Break if there is no more object compliant to criteria.

    popCR += population[i].CR;
    remCR = sumCR - popCR;

    if (popCR === sumCR || popCR > sumCR) {
      break;
    }
  }
  return population;
};

module.exports = {
  choosePool,
  sumCR,
  genPop
};
