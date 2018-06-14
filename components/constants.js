const dice = require('./dice');

const blankCharacter = {
  name: ' ',
  race: ' ',
  lvl: 1,
  exp: 0,
  HP: 4,
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
        dmg: dice.roll(1, 3),
        price: 0,
        type: 'onehanded'
      },
    ],
    shield: [],
    potion: ['', '', ''],
    ring: [],
    amulet: [],
    backpack: {
      armor: [],
      shield: [],
      weapon: [],
      pockets: [],
      ring: [],
      amulet: []
    }
  },
  gold: 0
};

module.exports = {
  blankCharacter
};
