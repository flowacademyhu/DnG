const dice = require('./dice.js');

const beastList = [
  {
    name: 'Wolf',
    CR: 0.25,
    AC: 13,
    HP: () => {
      return dice.roll(2, 8) + 2;
    },
    dmg: () => {
      return dice.roll(2, 4) + 2;
    },
    init: 2,
    atkMod: 4,
    numOfAtks: 1
  },
  {
    name: 'Dire Wolf',
    CR: 1,
    AC: 14,
    HP: () => {
      return dice.roll(5, 10) + 10;
    },
    dmg: () => {
      return dice.roll(2, 6) + 3;
    },
    atkMod: 5,
    init: 2,
    numOfAtks: 1
  },
  {
    name: 'Tiger',
    CR: 1,
    AC: 12,
    HP: () => {
      return dice.roll(5, 10) + 10;
    },
    dmg: () => {
      return dice.roll(1, 10) + 3;
    },
    atkMod: 5,
    init: 2,
    numOfAtks: 1
  },
  {
    name: 'Boar',
    CR: 0.25,
    AC: 11,
    HP: () => {
      return dice.roll(2, 8) + 2;
    },
    dmg: () => {
      return dice.roll(1, 6) + 1;
    },
    atkMod: 3,
    init: 0,
    numOfAtks: 1
  },
  {
    name: 'Black Bear',
    CR: 0.5,
    AC: 11,
    HP: () => {
      return dice.roll(3, 8) + 6;
    },
    dmg: () => {
      return dice.roll(2, 4) + 2;
    },
    atkMod: 3,
    init: 0,
    numOfAtks: 2
  },
  {
    name: 'Brown Bear',
    CR: 1,
    AC: 11,
    HP: () => {
      return dice.roll(4, 10) + 12;
    },
    dmg: () => {
      return dice.roll(2, 6) + 4;
    },
    atkMod: 5,
    init: 1,
    numOfAtks: 2
  }
];

const undeadList = [
  {
    name: 'Zombi',
    CR: 0.25,
    AC: 8,
    HP: () => {
      return dice.roll(3, 8) + 9;
    },
    dmg: () => {
      return dice.roll(1, 6) + 1;
    },
    atkMod: 3,
    init: 0,
    numOfAtks: 1
  },
  {
    name: 'Skeleton',
    CR: 0.25,
    AC: 13,
    HP: () => {
      return dice.roll(2, 8) + 4;
    },
    dmg: () => {
      return dice.roll(1, 6) + 2;
    },
    atkMod: 4,
    init: 1,
    numOfAtks: 1
  },
  {
    name: 'Ghoul',
    CR: 1,
    AC: 12,
    HP: () => {
      return dice.roll(5, 8);
    },
    dmg: () => {
      return dice.roll(2, 4) + 2;
    },
    atkMod: 4,
    init: 2,
    numOfAtks: 1,
    spec: 'poison'
  },
  {
    name: 'Ghast',
    CR: 2,
    AC: 13,
    HP: () => {
      return dice.roll(8, 8) + 10;
    },
    dmg: () => {
      return dice.roll(2, 6) + 3;
    },
    atkMod: 5,
    init: 3,
    numOfAtks: 2,
    spec: 'poison'
  }
];

const humanoidList = [
  {
    name: 'Berserker',
    CR: 2,
    AC: 13,
    HP: () => {
      return dice.roll(9, 8) + 27;
    },
    dmg: () => {
      return dice.roll(1, 12) + 3;
    },
    atkMod: 5,
    numOfAtks: 1,
    init: 3,
    spec: 'reckless'
  },
  {
    name: 'Convict',
    CR: 0.125,
    AC: 12,
    HP: () => {
      return dice.roll(2, 8) + 2;
    },
    dmg: () => {
      return dice.roll(1, 6) + 1;
    },
    atkMod: 5,
    init: 0,
    numOfAtks: 1
  },
  {
    name: 'A Szakallember',
    CR: 7.5,
    AC: 19,
    HP: () => {
      return dice.roll(8, 10) + 50;
    },
    dmg: () => {
      return dice.roll(1, 10) + 8;
    },
    atkMod: 7,
    init: 6,
    numOfAtks: 3
  },
  {
    name: 'Gladiator',
    CR: 2,
    AC: 13,
    HP: () => {
      return dice.roll(10, 8) + 20;
    },
    dmg: () => {
      return dice.roll(1, 8) + 3;
    },
    atkMod: 5,
    init: 3,
    numOfAtks: 3
  },
  {
    name: 'Experienced Gladiator',
    CR: 5,
    AC: 16,
    HP: () => {
      return dice.roll(15, 8) + 45;
    },
    dmg: () => {
      return dice.roll(2, 6) + 4;
    },
    atkMod: 7,
    init: 3,
    numOfAtks: 3
  },
  {
    name: 'Armored Veteran',
    CR: 3,
    AC: 18,
    HP: () => {
      return dice.roll(8, 8) + 16;
    },
    dmg: () => {
      return dice.roll(2, 6) + 3;
    },
    atkMod: 5,
    init: 0,
    numOfAtks: 2
  },
  {
    name: 'Gladiator Recruit',
    CR: 5,
    AC: 11,
    HP: () => {
      return dice.roll(5, 8) + 10;
    },
    dmg: () => {
      return dice.roll(1, 6) + 2;
    },
    atkMod: 4,
    init: 0,
    numOfAtks: 2
  },
  {
    name: 'Agile Throat-cutter',
    CR: 1,
    AC: 16,
    HP: () => {
      return dice.roll(6, 8);
    },
    dmg: () => {
      return dice.roll(1, 6) + 2;
    },
    atkMod: 4,
    init: 3,
    numOfAtks: 2,
    spec: 'sneakattack'
  }
];

module.exports = {
  beastList,
  undeadList,
  humanoidList
};
