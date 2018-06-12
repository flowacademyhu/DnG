const readlineSync = require('readline-sync');

// Main Menu
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
    // stb.
  }
  return charSheet;
};

const calculateModifiers = (stat) => {
  
};

module.exports = {
  mainMenu,
  newCharacter,
  chooseRace
};
