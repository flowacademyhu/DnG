const dice = require('./dice.js');

const beastList = [
  {
    name: 'Wolf',
    ID: 'MB0001',
    CR: 0.25,
    AC: 13,
    HP: dice.roll(2, 8) + 2,
    dmg: dice.roll(2, 4) + 2,
    atkMod: 4,
    numOfAtks: 1
  },
  {
    name: 'Dire Wolf',
    ID: 'MB0002',
    CR: 1,
    AC: 14,
    HP: dice.roll(5, 10) + 10,
    dmg: dice.roll(2, 6) + 3,
    atkMod: 5,
    numOfAtks: 1
  }
];

const undeadList = [
  {
    name: 'Zombi',
    ID: 'MU0001',
    CR: 0.25,
    AC: 8,
    HP: dice.roll(3, 8) + 9,
    dmg: dice.roll(1, 6) + 1,
    atkMod: 3,
    numOfAtks: 1
  },
  {
    name: 'Skeleton',
    ID: 'MU0002',
    CR: 0.25,
    AC: 13,
    HP: dice.roll(2, 8) + 4,
    dmg: dice.roll(1, 6) + 2,
    atkMod: 4,
    numOfAtks: 1
  }
];

const humanoidList = [
  {
    name: 'Berserker',
    ID: 'MH0001',
    CR: 2,
    AC: 13,
    HP: dice.roll(9, 8) + 27,
    dmg: dice.roll(1, 12) + 3,
    atkMod: 5,
    numOfAtks: 1,
    spec: 'reckless'
  },
  {
    name: 'Convict',
    ID: 'MH0002',
    CR: 0.125,
    AC: 12,
    HP: dice.roll(2, 8) + 2,
    dmg: dice.roll(1, 6) + 1,
    atkMod: 5,
    numOfAtks: 1
  }
];

module.exports = {
  beastList,
  undeadList,
  humanoidList
};
