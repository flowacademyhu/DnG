const dummy = require('./dummy');

const blankCharacter = {
  name: ' ',
  race: ' ',
  lvl: 1,
  exp: 0,
  HP: 0,
  tempHP: 0,
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
    armor: 'ID002'
  }
};

// console.log(dummy.armors.filter(item => item.ID === 'ID002'));

module.exports = {
  blankCharacter
};
