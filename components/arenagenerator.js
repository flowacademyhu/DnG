const dice = require('./dice');
const monsters = require('./monsters');
const clone = require('clone');
const readlineSync = require('readline-sync');

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

// Take random monster from type till CR === Monsters CR; gen INIT and HP
const genPop = (sumCR) => {
  let population = [];
  let type = choosePool();
  let popCR = 0;
  let monster;
  let remCR = sumCR;

  for (let i = 0; i < 8; i++) {
    // pick a monster object from list, clone and add to pop, after monster expansion put remCR crit down to 1.5
    monster = type.filter(monster => monster.CR <= remCR);
    monster = monster.filter(monster => monster.CR >= remCR - 4);
    population[i] = clone(monster[dice.randomIndex(monster)]);
    // generate fix HP and Initiative
    population[i].HP = population[i].HP();
    population[i].init = dice.roll(1, 20) + population[i].init;

    if (population[i] === undefined) {
      break;
    } // Break if there is no more object compliant to criteria.

    popCR += population[i].CR;
    remCR = sumCR - popCR;

    if (popCR >= sumCR) {
      break;
    }
  }
  return population;
};

// In progress combat sys and test, dont forget to remove blankchar and ref.:

const blankCharacter = {
  name: 'JATEKOS',
  race: 'EMBER',
  lvl: 5,
  exp: 0,
  HP: 20,
  tempHP: 20,
  ATK: 2,
  attributes: {
    Str: 3,
    Dex: 3,
    Con: 2,
    Int: 2,
    Wis: 2,
    Cha: 1
  },
  modifiers: {
    StrMOD: 3,
    DexMOD: 3,
    ConMOD: 2,
    IntMOD: 3,
    WisMOD: 3,
    ChaMOD: 3
  },
  proficiency: 2,
  AC: 15,
  init: 3,
  equipment: {
    armor: [
      {
        name: 'Rugs',
        AC: 2,
        maxDexMod: 8,
        reqStr: 0,
        price: 0
      }
    ],
    weapon: [
      {
        name: 'Sword',
        dmgDisplay: '1-10',
        dmg: () => {
          return dice.roll(1, 10) + blankCharacter.modifiers.StrMOD;
        },
        price: 5,
        type: 'onehanded'
      }
    ],
    shield: [],
    potion: [],
    ring: [],
    amulet: [],
    backpack: {
      armor: [],
      shield: [],
      weapon: [],
      potion: [],
      ring: [],
      amulet: []
    }
  },
  gold: 0
};

// console.log(blankCharacter.tempHP());

const remainingHPOfGenPop = (genPop) => {
  let remainingHP = 0;
  for (let i = 0; i < genPop.length; i++) {
    if (genPop[i].HP >= 0) {
      remainingHP += genPop[i].HP;
    }
  }
  return remainingHP;
};

// Player attacks and dmgs enemy.
const playerAttack = (player, enemy) => {
  let attackRoll = dice.roll(1, 20);
  let dmg = player.equipment.weapon[0].dmg() + player.modifiers.StrMOD;
  if (player.ATK + attackRoll >= enemy.AC && attackRoll === 20) {
    enemy.HP -= dmg * 2;
    if (enemy.HP <= 0) {
      return console.log('CRIT! You caused: ' + dmg * 2 + ' dmg to the ' + enemy.name + ' and killed it.');
    }
    return console.log('CRIT! You caused: ' + dmg * 2 + ' dmg to the ' + enemy.name + '.');
  } else if (player.ATK + attackRoll >= enemy.AC) {
    enemy.HP -= dmg;
    if (enemy.HP <= 0) {
      return console.log('HIT! You caused: ' + dmg + ' dmg to the ' + enemy.name + ' and killed it.');
    }
    return console.log('HIT! You caused: ' + dmg + ' dmg to the ' + enemy.name + '.');
  } else {
    return console.log('MISS!');
  }
};

// Enemy attacks and dmgs player.
const enemyAttack = (enemy, player) => {
  let attackRoll = dice.roll(1, 20);
  let dmg = enemy.dmg();
  if (enemy.atkMod + attackRoll >= player.AC && attackRoll === 20) {
    player.tempHP -= dmg * 2;
    if (player.tempHP <= 0) {
      return console.log('CRIT! You suffered: ' + dmg * 2 + ' dmg from the ' + enemy.name + ' and fall unconscious.');
    }
    return console.log('CRIT! You suffered: ' + dmg * 2 + ' dmg from the ' + enemy.name + '.');
  } else if (enemy.atkMod + attackRoll >= player.AC) {
    player.tempHP -= dmg;
    if (player.tempHP <= 0) {
      return console.log('HIT! You suffered: ' + dmg + ' dmg from the ' + enemy.name + ' and fall unconscious.');
    }
    return console.log('HIT! You suffered: ' + dmg + ' dmg from the ' + enemy.name + '.');
  } else {
    return console.log('MISS! The ' + enemy.name + ' failed to hit you.');
  }
};

// Clear dead enemies from list
const clearDead = (enemies) => {
  for (let m = 0; m < enemies.length; m++) {
    if (enemies[m].HP <= 0) {
      enemies.splice(m, 1);
    }
  }
  return enemies;
};

// in case its players turn...
const playerUI = (player, enemies) => {
  while (true) {
    let answers = ['Attack', 'Drink Potion', 'Special'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Do nothing'});
    if (index === 0) {
      // who to attack?
      // break
    } else if (index === 1) {
      // What to drink, drink it
      // continue
    } else if (index === 2) {
      // what, apply execute
      // continue
    } else {
      break;
    }
  }
};
// console.log(index);

// let x = genPop(5);

// console.log(x);
// playerAttack(blankCharacter, x[0]);
// playerAttack(blankCharacter, x[0]);

const checkWinner = (character) => {
  if (character.tempHP > 0) {
    console.log('You are victorious!');
    character.exp += 100;
    character.gold += 100;
    // winnings
  } else {
    console.log('You have been defeated!');
    character.exp += 50;
    character.gold += 0;
  }
};

const combat = (enemies, character) => {
  let characterInit = character.init + dice.roll(1, 20);
  console.log('CharacterInit =', characterInit);
  let turnCounter = 1;
  console.log('enemies:', enemies);
  console.log('starting HP of player: ' + character.tempHP + ' starting HP of enemies: ' + remainingHPOfGenPop(enemies));
  // check death

  while (character.tempHP > 0 && remainingHPOfGenPop(enemies) > 0) {
    let initCounter = 30;
    console.log('Turn:', turnCounter);
    for (initCounter; initCounter > -5; initCounter--) {
      // console.log(initCounter);
      if (characterInit === initCounter) {
        // player ui;
        playerAttack(character, enemies[0]);
        // after every attack:
        enemies = clearDead(enemies);
      }
      for (let m = 0; m < enemies.length; m++) {
        if (enemies[m].init === initCounter) {
          enemyAttack(enemies[m], character);
          if (character.tempHP <= 0) {
            break;
          }
        }
      }
      if (character.tempHP <= 0) {
        break;
      }
    }
    turnCounter += 1;
  }
  checkWinner(character);
};

combat(genPop(1), blankCharacter);

module.exports = {
  choosePool,
  sumCR,
  genPop,
  clearDead,
  remainingHPOfGenPop,
  playerAttack,
  enemyAttack,
  playerUI
};
