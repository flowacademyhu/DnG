const dice = require('./dice');

const blankCharacter = {
  name: ' ',
  race: ' ',
  lvl: 1,
  lvlBoolean: {
    lvl2: false,
    lvl3: false,
    lvl4: false,
    lvl5: false,
    lvl6: false,
    lvl7: false,
    lvl8: false,
    lvl9: false,
    lvl10: false
  },
  exp: 0,
  HP: 0,
  tempHP: 0,
  ATK: 0,
  attributes: {
    Str: 0,
    Dex: 0,
    Con: 0,
    Int: 0,
    Wis: 0,
    Cha: 0
  },
  modifiers: {
    StrMOD: 0,
    DexMOD: 0,
    ConMOD: 0,
    IntMOD: 0,
    WisMOD: 0,
    ChaMOD: 0
  },
  proficiency: 2,
  AC: 0,
  init: 0,
  numOfAtks: 1,
  secondWind: 1,
  actionSurge: 0,
  equipment: {
    armor: [
      {
        name: 'Rugs',
        AC: 0,
        maxDexMod: 5,
        reqStr: 0,
        price: 0
      }
    ],
    weapon: [
      {
        name: 'Rusty Dagger',
        dmgDisplay: '1-3',
        dmg: () => {
          return dice.roll(1, 3);
        },
        price: 0,
        type: 'onehanded'
      }
    ],
    shield: [
      {
        name: 'No Shield',
        AC: 0,
        price: 0
      }
    ],
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

module.exports = {
  blankCharacter
};
