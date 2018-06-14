const dice = require('./dice');
const monsters = require('./monsters');
const readlineSync = require('readline-sync');
const fs = require('fs');
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

// Define sum CR
const sumCR = (difficulty, lvl) => {
  let sumCR = (difficulty * 0.25) * lvl;
  return sumCR;
};

// Picks a monster from the type list. That was a try to solve the random stats problem.
const pickMonster = (type, sumCR) => {
  let monster;
  if (type === monsters.beastList) {
    monster = monsters.beastList.filter(monster => monster.CR < sumCR);
  } else if (type === monsters.undeadList) {
    monster = monsters.undeadList.filter(monster => monster.CR < sumCR);
  } else if (type === monsters.humanoidList) {
    monster = monsters.humanoidList.filter(monster => monster.CR < sumCR);
  }
  return monster;
};

// Take random monster from type till CR === Monsters CR; Every monster sould make random vals.
const populateArena = (sumCR) => {
  let population = [];
  let type = choosePool();
  let popCR = 0;
  let monster;
  for (let i = 0; i < 8; i++) {
    monster = type.filter(monster => monster.CR < sumCR);
    population[i] = monster[dice.randomIndex(monster)];
    popCR += population[i].CR;
    if (popCR === sumCR || popCR > sumCR) {
      break;
    }
  }
  console.log(popCR);
  return population;
};

console.log('pop:', populateArena(4));
