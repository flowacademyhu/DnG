const readlineSync = require('readline-sync');

const mainMenu = () => {
  let answers = ['Create Character', 'Load Character', 'Quit Game'];
  let index = readlineSync.keyInSelect(answers, '');
  return index;
};

const newCharacter = (charSheet) => {
  charSheet.name = readlineSync.question('Character Name: ');
  return charSheet;
};

const chooseRace = (charSheet) => {
  let answers = ['Human (+1 To All Stats)', 'Elf (+2 Dexterity)', 'Dwarf (+2 Constitution)', 'Half-Orc (+2 Strength)'];
  let index = readlineSync.keyInSelect(answers, '');
  if (index === 0) {
    charSheet.attributes.Str += 1;
    charSheet.attributes.Dex += 1;
    charSheet.attributes.Con += 1;
    charSheet.attributes.Int += 1;
    charSheet.attributes.Wis += 1;
    charSheet.attributes.Cha += 1;
  } else if (index === 1) {
    charSheet.attributes.Dex += 2;
  } else if (index === 2) {
    charSheet.attributes.Con += 2;
  } else if (index === 3) {
    charSheet.attributes.Str += 2;
  }
  return charSheet;
};

const modifierCalculator = (character) => {
  let stats = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
  let statsMOD = ['StrMOD', 'DexMOD', 'ConMOD', 'IntMOD', 'WisMOD', 'ChaMOD'];
  for (let i = 0; i < stats.length; i++) {
    character.modifiers[statsMOD[i]] = character.attributes[stats[i]] > 10 ? Math.floor((character.attributes[stats[i]] - 10) / 2) : Math.ceil((character.attributes[stats[i]] - 10) / 2);
  }
};

module.exports = {
  mainMenu,
  newCharacter,
  chooseRace,
  modifierCalculator
};
