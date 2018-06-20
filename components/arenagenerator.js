const dice = require('./dice');
const monsters = require('./monsters');
const clone = require('clone');
const readlineSync = require('readline-sync');
const items = require('./items');
// A lvl input and difficulty is needed and full charsheet. At the end has to save charSheet

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

const chooseDifficulty = () => {
  console.log('Choose difficulty:');
  let answers = ['Easy', 'Normal', 'Hard'];
  let index = readlineSync.keyInSelect(answers, '', {cancel: 'Cancel'});
  if (index >= 0) {
    return index + 1;
  } else {
    console.log('Returning to menu.');
  }
};

// Calculate sum CR
const sumCR = (lvl, difficulty) => {
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
    // pick a monster object from list, clone and add to pop
    monster = type.filter(monster => monster.CR <= remCR);
    monster = monster.filter(monster => monster.CR >= remCR - 2.25);
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

// Debug char:
/*
let blankCharacter = {
  name: 'JATEKOS',
  race: 'EMBER',
  lvl: 1,
  exp: 0,
  HP: 100,
  tempHP: 100,
  ATK: 3,
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
  numOfAtks: 2,
  secondWind: 1,
  actionSurge: 0,
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
        name: 'Longsword',
        dmgDisplay: '1-10',
        price: 5,
        type: 'onehanded'
      }
    ],
    shield: [],
    potion: [
      {
        name: 'Small HP potion',
        price: 80,
        healDisplay: '4-18'
      },
      {
        name: 'Small HP potion',
        price: 20,
        healDisplay: '3-10'
      }
    ],
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
*/

// items load methods.
const characterLoader = (character) => {
  character.specials = [{}, {}];
  let index = 0;
  character.specials[index].name = 'Action Surge';
  character.specials[index].counter = clone(character.actionSurge);
  character.specials[index].description = ' (Doubles your number of attacks for this turn.) Use(s) left: ';
  index++;

  character.specials[index].name = 'Second Wind';
  character.specials[index].counter = clone(character.secondWind);
  character.specials[index].description = ' (Restores 1d10 + level HP) Use(s) left: ';

  if (character.specials[0].counter === 0) {
    character.specials.splice(0, 1);
  }

  let i = 0;
  let j = 0;
  for (i; i < character.equipment.weapon.length; i++) {
    for (j; j < items.weaponList.length; j++) {
      if (character.equipment.weapon[i].name === items.weaponList[j].name) {
        character.equipment.weapon[i].dmg = items.weaponList[j].dmg;
      }
    }
  }

  for (i = 0; i < character.equipment.potion.length; i++) {
    for (j = 0; j < items.potionList.length; j++) {
      if (character.equipment.potion[i].name === items.potionList[j].name) {
        character.equipment.potion[i].heal = items.potionList[j].heal;
      }
    }
  }
};

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
    return console.log('MISS! You missed the ' + enemy.name + '.');
  }
};

// Enemy attacks and dmgs player.
const enemyAttack = (enemy, player) => {
  let attackRoll = dice.roll(1, 20);
  let dmg = enemy.dmg();

  if (enemy.atkMod + attackRoll >= player.AC && attackRoll === 20) {
    player.tempHP -= dmg * 2;
    if (player.tempHP <= 0) {
      return console.log('(crit) You suffered: ' + dmg * 2 + ' dmg from the ' + enemy.name + ' and fall unconscious.');
    }
    return console.log('(crit) You suffered: ' + dmg * 2 + ' dmg from the ' + enemy.name + '.');
  } else if (enemy.atkMod + attackRoll >= player.AC) {
    player.tempHP -= dmg;
    if (player.tempHP <= 0) {
      return console.log('(hit) You suffered: ' + dmg + ' dmg from the ' + enemy.name + ' and fall unconscious.');
    }
    return console.log('(hit) You suffered: ' + dmg + ' dmg from the ' + enemy.name + '.');
  } else {
    return console.log('(miss) The ' + enemy.name + ' failed to hit you.');
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

const makeChoiceOfEnemies = (enemies) => {
  let choices = [];
  for (let m = 0; m < enemies.length; m++) {
    choices[m] = enemies[m].name + ' HP: ' + enemies[m].HP + ' Armor Class: ' + enemies[m].AC + ' Challenge Rating: ' + enemies[m].CR + ' Number of Attacks: ' + enemies[m].numOfAtks;
  }
  return choices;
};

const makeChoiceOfPotion = (player) => {
  let choices = [];
  for (let m = 0; m < player.equipment.potion.length; m++) {
    choices[m] = player.equipment.potion[m].name + ' Heals: ' + player.equipment.potion[m].healDisplay;
  }
  return choices;
};

const makeChoiceOfSpecials = (player) => {
  let choices = [];
  let index = 0;
  for (let m = 0; m < player.specials.length; m++) {
    if (player.specials[m].counter >= 0) {
      choices[index] = player.specials[m].name + player.specials[m].description + player.specials[m].counter;
      index++;
    }
  }
  return choices;
};

// drink, remove potion
const drinkPotion = (player, potion, indexOfPotion) => {
  let healedHP = potion.heal();
  console.log('The potion healed: ' + healedHP + ' HP');
  player.tempHP += healedHP;
  if (player.tempHP > player.HP) {
    player.tempHP = player.HP;
  }
  player.equipment.potion.splice(indexOfPotion, 1);
  console.log('Your HP now: ' + player.tempHP);
};

// Might rework in the future for new featurs:
/* const activateSpecial = (player, whatToActivate) => {
  if (player.specials[whatToActivate].name === 'Action Surge') {
    player.specials[whatToActivate].counter--;
    if (player.specials[whatToActivate].counter === 0) {
      player.specials.splice(whatToActivate, 1);
    }
    return player.numOfAtks;
  }
  if (player.specials[whatToActivate].name === 'Second Wind') {
    player.specials[whatToActivate].counter--;
    let heal = dice.roll(1, 10) + player.lvl;
    player.tempHP += heal;
    console.log('You have regained: ' + heal + 'HPs');
    if (player.specials[whatToActivate].counter === 0) {
      player.specials.splice(whatToActivate, 1);
    }
    if (player.tempHP > player.HP) {
      player.tempHP = player.HP;
    }
  }
};
*/

// in case its players turn...
const playerUI = (player, enemies) => {
  let remainingAttacks = clone(player.numOfAtks);
  let specialsPerTurn = true;
  while (true) {
    console.log('What do you want to do?');
    let answers = ['Attack', 'Drink Potion', 'Special'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Do nothing this turn.'});

    if (index === 0) {
      for (let i = 0; i < remainingAttacks; i) {
        let answers = makeChoiceOfEnemies(enemies);
        console.log('Who do you want to attack? You have: ' + remainingAttacks + ' Attacks left for this turn.');
        let whoToAttack = readlineSync.keyInSelect(answers, '', {cancel: 'Forgo attack'});
        if (whoToAttack === -1) {
          remainingAttacks--;
          continue;
        }
        playerAttack(player, enemies[whoToAttack]);
        remainingAttacks--;
        enemies = clearDead(enemies);
        if (enemies[0] === undefined) {
          console.log('All enemies have been defeated!');
          break;
        }
      }
      remainingAttacks = clone(player.numOfAtks);
      break;
    } else if (index === 1) {
      let answers = makeChoiceOfPotion(player);
      if (answers[0] === undefined) {
        console.log('You do not have any potions left.');
        continue;
      }
      let whatToDrink = readlineSync.keyInSelect(answers, 'Drink:', {cancel: 'Cancel'});
      drinkPotion(player, player.equipment.potion[whatToDrink], whatToDrink);
      continue;
    } else if (index === 2) {
      if (specialsPerTurn === false) {
        console.log('You can activate only 1 special per turn.');
        continue;
      }
      let answers = makeChoiceOfSpecials(player);
      if (answers[0] === undefined) {
        console.log('You do not have any specials to activate.');
        continue;
      }
      console.log('What to activate?');
      let whatToActivate = readlineSync.keyInSelect(answers, '', {cancel: 'Cancel'});
      if (whatToActivate !== -1) {
        specialsPerTurn = false;
        if (player.specials[whatToActivate].name === 'Second Wind') {
          player.specials[whatToActivate].counter--;
          let heal = dice.roll(1, 10) + player.lvl;
          player.tempHP += heal;
          console.log('You have regained: ' + heal + 'HPs');
          if (player.specials[whatToActivate].counter === 0) {
            player.specials.splice(whatToActivate, 1);
          }
          if (player.tempHP > player.HP) {
            player.tempHP = player.HP;
          }
          continue;
        }
        if (player.specials[whatToActivate].name === 'Action Surge') {
          player.specials[whatToActivate].counter--;
          if (player.specials[whatToActivate].counter === 0) {
            player.specials.splice(whatToActivate, 1);
          }
          remainingAttacks += player.numOfAtks;
        }
        continue;
      } else {
        continue;
      }
    } else {
      break;
    }
  }
};

const endingSequence = (character, difficulty) => {
  if (character.tempHP > 0) {
    console.log('You are victorious!');

    let expWin = 500 * sumCR(character.lvl, difficulty) * ((difficulty - 1) / 10 + 1);
    character.exp += expWin;
    let goldWin = 500 * sumCR(character.lvl, difficulty) * ((difficulty - 1) / 10 + 1);
    character.gold += goldWin;

    readlineSync.question('You have gained: ' + expWin + ' experience points and ' + goldWin + ' gold.');
  } else {
    console.log('You have been defeated!');

    let expWin = 250 * sumCR(character.lvl, difficulty) * ((difficulty - 1) / 10 + 1);
    character.exp += expWin;
    readlineSync.question('You have gained: ' + expWin + ' experience points and have not gained any gold.');
  }
  character.tempHP = character.HP;
  delete character.specials;
};

const combat = (character) => {
  characterLoader(character);
  let difficulty = chooseDifficulty();
  let asumCR = sumCR(character.lvl, difficulty);
  let enemies = genPop(asumCR);
  let characterInit = character.init + dice.roll(1, 20);
  console.log('CharacterInit =', characterInit);
  let turnCounter = 1;
  console.log('enemies:', enemies);
  console.log('starting HP of player: ' + character.tempHP + ' starting HP of enemies: ' + remainingHPOfGenPop(enemies));

  while (character.tempHP > 0 && remainingHPOfGenPop(enemies) > 0) {
    let initCounter = 30;
    console.log('Turn:', turnCounter);
    for (initCounter; initCounter > -5; initCounter--) {
      // console.log(initCounter);
      if (characterInit === initCounter) {
        playerUI(character, enemies);
        enemies = clearDead(enemies);
      }
      for (let m = 0; m < enemies.length; m++) {
        if (enemies[m].init === initCounter) {
          for (let i = 0; i < enemies[m].numOfAtks; i++) {
            enemyAttack(enemies[m], character);
            console.log('You have: ' + character.tempHP + ' HP.');
            if (character.tempHP <= 0) {
              break;
            }
          }
        }
      }
      if (character.tempHP <= 0) {
        break;
      }
    }
    turnCounter += 1;
  }
  endingSequence(character, difficulty);
};

// combat(blankCharacter);
// characterLoader(blankCharacter);
// console.log(blankCharacter);

/* //Test genPop:
for (let i = 0; i < 500; i++) {
  for (let cr = 0.25; cr <= 7.5; cr += 0.25) {
    let x = genPop(cr)
    if (cr === 7.5) {
      console.log(i, cr);
      console.log(x[0].name);
    }
  }
}
*/

module.exports = {
  combat
};
