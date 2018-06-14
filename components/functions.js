const readlineSync = require('readline-sync');
const clear = require('console-clear');
const fs = require('fs');
const clone = require('clone');

const dice = require('./dice');
const design = require('./design');
const constants = require('./constants');
const items = require('./items');

// MAIN MENU FUNCTIONS

const mainMenu = () => {
  let answers = ['Create Character', 'Load Character'];
  let index = readlineSync.keyInSelect(answers, '', {cancel: 'Quit Game'});

  return index;
};

// CHARACTER CREATION / SAVE / LOAD

const createCharacter = () => {
  let charSheet = clone(constants.blankCharacter);

  clear();
  design.sheetDesign(charSheet);
  charSheet = chooseName(charSheet);

  clear();
  design.sheetDesign(charSheet);
  charSheet = chooseRace(charSheet);
  charSheet = chooseAttributes(charSheet);
  calculateHP(charSheet);
  calculateInit(charSheet);

  saveChars(charSheet);
  return charSheet;
};

const chooseName = (charSheet) => {
  charSheet.name = readlineSync.question('Set Character Name: ');
  return charSheet;
};

const chooseRace = (charSheet) => {
  let answers = ['Human (+1 To All Stats)', 'Elf (+2 Dexterity)', 'Dwarf (+2 Constitution)', 'Half-Orc (+2 Strength)'];
  let index = readlineSync.keyInSelect(answers, 'Choose Race: ', {cancel: false});
  if (index === 0) {
    charSheet.attributes.Str += 1;
    charSheet.attributes.Dex += 1;
    charSheet.attributes.Con += 1;
    charSheet.attributes.Int += 1;
    charSheet.attributes.Wis += 1;
    charSheet.attributes.Cha += 1;
    charSheet.race = 'Human';
  } else if (index === 1) {
    charSheet.attributes.Dex += 2;
    charSheet.race = 'Elf';
  } else if (index === 2) {
    charSheet.attributes.Con += 2;
    charSheet.race = 'Dwarf';
  } else if (index === 3) {
    charSheet.attributes.Str += 2;
    charSheet.race = 'Half-Orc';
  }
  return charSheet;
};

const chooseAttributes = (charSheet) => {
  let generatedAttributeList = dice.genAtr();
  let stats = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
  let stats2 = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  let index1 = 0;
  let index2 = 0;
  while (generatedAttributeList.length > 0) {
    clear();
    design.sheetDesign(charSheet);
    index1 = readlineSync.keyInSelect(generatedAttributeList, 'Select value to distribute: ', {cancel: false});
    index2 = readlineSync.keyInSelect(stats2, 'Add the value to the following attribute: ', {cancel: false});
    charSheet.attributes[stats[index2]] += generatedAttributeList.splice(index1, 1)[0];
    stats.splice(index2, 1);
    stats2.splice(index2, 1);
    modifierCalculator(charSheet);
  }
  return charSheet;
};

const calculateHP = (charSheet) => {
  charSheet.HP += (6 + charSheet.modifiers.ConMOD);
  charSheet.tempHP = charSheet.HP;
};

const calculateInit = (charSheet) => {
  charSheet.init = charSheet.modifiers.DexMOD;
  charSheet.tempHP = charSheet.HP;
};

const modifierCalculator = (character) => {
  let stats = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
  let statsMOD = ['StrMOD', 'DexMOD', 'ConMOD', 'IntMOD', 'WisMOD', 'ChaMOD'];
  for (let i = 0; i < stats.length; i++) {
    character.modifiers[statsMOD[i]] = character.attributes[stats[i]] > 10 ? Math.floor((character.attributes[stats[i]] - 10) / 2) : Math.ceil((character.attributes[stats[i]] - 10) / 2);
  }
};

const saveChars = (charSheet) => {
  fs.writeFileSync(`saved/${charSheet.name}.json`, JSON.stringify(charSheet));
};

const loadChars = () => {
  clear();
  design.logo();

  const savedFolder = './saved/';
  let files = [];
  fs.readdirSync(savedFolder).forEach(file => {
    files.push(file);
  });

  let index = readlineSync.keyInSelect(files, 'Load Character by Name: ', {cancel: false});

  let loadedSheet = fs.readFileSync(`./saved/${files[index]}`);
  return JSON.parse(loadedSheet);
};

// CHARACTER MENU

const characterMenu = (charSheet) => {
  while (true) {
    clear();
    design.sheetDesign(charSheet);
    let answers = ['Arena', 'Shop', 'Inventory'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Quit to Main Menu'});
    if (index === 0) {
      console.log('Enter Fight');
    } else if (index === 1) {
      shop(charSheet);
    } else if (index === -1) {
      saveChars(charSheet);
      break;
    }
  }
};

const shop = (charSheet) => {
  while (true) {
    clear();
    design.inventoryDesign(charSheet);
    let answers = ['Armor', 'Weapon', 'Misc'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Exit from Shop'});
    if (index === 0) {
      shopArmor(charSheet);
    } else if (index === -1) {
      break;
    }
  }
};

const shopArmor = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let armorList = [];
  items.armorList.forEach(item => {
    armorList.push(`${item.name} | ${item.AC} AC | ${item.price} gold `);
  });
  let indexArmor = readlineSync.keyInSelect(armorList, '', {cancel: 'Back'});

  if (indexArmor === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.armorList[indexArmor].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.armorList[indexArmor].price;
    charSheet.equipment.backpack.armor.push(items.armorList[indexArmor]);
  }
};

// EXPORT

module.exports = {
  mainMenu,
  createCharacter,
  modifierCalculator,
  loadChars,
  characterMenu
};

console.log();
