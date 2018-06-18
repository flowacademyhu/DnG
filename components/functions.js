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
  chooseName(charSheet);

  clear();
  design.sheetDesign(charSheet);
  chooseRace(charSheet);
  chooseAttributes(charSheet);

  calculateStats(charSheet);

  saveChars(charSheet);
  return charSheet;
};

const chooseName = (charSheet) => {
  charSheet.name = readlineSync.question('Set Character Name: ');
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

// STAT CALCULATION

const calculateStats = (charSheet) => {
  calculateHP(charSheet);
  calculateInit(charSheet);
  calculateATK(charSheet);
  calculateAC(charSheet);
};

const calculateHP = (charSheet) => {
  charSheet.HP = 4 + (6 + charSheet.modifiers.ConMOD) * charSheet.lvl;
};

const calculateInit = (charSheet) => {
  charSheet.init = charSheet.modifiers.DexMOD;
};

const calculateATK = (charSheet) => {
  let fromItems = 0;
  if (charSheet.equipment.amulet.length > 0) {
    fromItems += charSheet.equipment.amulet[0].ATK;
  }
  if (charSheet.equipment.ring.length > 0) {
    fromItems += charSheet.equipment.ring[0].ATK;
  }

  charSheet.ATK = charSheet.modifiers.DexMOD + charSheet.proficiency + fromItems;
};

const calculateAC = (charSheet) => {
  let fromItems = 0;
  if (charSheet.equipment.amulet.length > 0) {
    fromItems += charSheet.equipment.amulet[0].AC;
  }
  if (charSheet.equipment.ring.length > 0) {
    fromItems += charSheet.equipment.ring[0].AC;
  }
  if (charSheet.equipment.armor.length > 0) {
    fromItems += charSheet.equipment.armor[0].AC;
  }
  if (charSheet.equipment.shield.length > 0) {
    fromItems += charSheet.equipment.shield[0].AC;
  }

  charSheet.AC = charSheet.modifiers.DexMOD + 10 + fromItems;
};

// CHARACTER MENU

const characterMenu = (charSheet) => {
  while (true) {
    calculateStats(charSheet);

    clear();
    design.sheetDesign(charSheet);

    let answers = ['Arena', 'Shop', 'Inventory'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Quit to Main Menu'});

    if (index === 0) {
      console.log('Enter Fight');
    } else if (index === 1) {
      shop(charSheet);
    } else if (index === 2) {
      inventory(charSheet);
    } else if (index === -1) {
      saveChars(charSheet);
      break;
    }
  }
};

// SHOP

const shop = (charSheet) => {
  while (true) {
    clear();
    design.inventoryDesign(charSheet);

    let answers = ['Buy Armor', 'Buy Shield', 'Buy Weapon', 'Buy Potion', 'Buy Ring', 'Buy Amulet'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Exit from Shop'});

    if (index === -1) {
      break;
    }

    shopAll(charSheet, index);
  }
};

const shopAll = (charSheet, i) => {
  let options = ['armor', 'shield', 'weapon', 'potion', 'ring', 'amulet'];
  let itemsOptions = ['armorList', 'shieldList', 'weaponList', 'potionList', 'ringList', 'amuletList'];

  clear();
  design.inventoryDesign(charSheet);

  let list = [];

  items[itemsOptions[i]].forEach(item => {
    if (i === 0 || i === 1) {
      list.push(`${item.name} | ${item.AC} AC | ${item.price} gold`);
    } else if (i === 2) {
      list.push(`${item.name} | ${item.dmgDisplay} dmg | ${item.price} gold`);
    } else if (i === 3) {
      list.push(`${item.name} | ${item.healDisplay} HP | ${item.price} gold`);
    } else if (i === 4 || i === 5) {
      list.push(`${item.name} | ${item.AC} AC | ${item.ATK0} ATK | ${item.price} gold`);
    }
  });

  let index = readlineSync.keyInSelect(list, '', {cancel: 'Back'});

  if (index === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items[itemsOptions[i]][index].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items[itemsOptions[i]][index].price;
    charSheet.equipment.backpack[options[i]].push(items[itemsOptions[i]][index]);
  }
};

// INVENTORY

// EGYSZERŰSÍTENI !!!!!!
const inventory = (charSheet) => {
  while (true) {
    clear();
    design.inventoryDesign(charSheet);

    let answers = ['Equip Armor', 'Equip Shield', 'Equip Weapon', 'Equip Potion', 'Equip Ring', 'Equip Amulet'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Exit from Inventory'});

    if (index === -1) {
      break;
    }

    equipAll(charSheet, index);
  }
};

const equipAll = (charSheet, i) => {
  clear();
  design.inventoryDesign(charSheet);

  let options = ['armor', 'shield', 'weapon', 'potion', 'ring', 'amulet'];
  let list = [];

  charSheet.equipment.backpack[options[i]].forEach(element => {
    if (i === 0 || i === 1) {
      list.push(`${element.name} | ${element.AC} AC`);
    } else if (i === 2) {
      list.push(`${element.name} | ${element.dmgDisplay} dmg`);
    } else if (i === 3) {
      list.push(`${element.name} | ${element.healDisplay} HP`);
    } else if (i === 4 || i === 5) {
      list.push(`${element.name} | ${element.AC} AC | ${element.ATK} ATK`);
    }
  });
  let index = readlineSync.keyInSelect(list, '', {cancel: 'Back'});

  if (index === -1) {
    return;
  }

  if (charSheet.equipment[options[i]].length > 0) {
    charSheet.equipment.backpack[options[i]].push(charSheet.equipment[options[i]][0]);
    charSheet.equipment[options[i]].splice(0, 1);
  }
  charSheet.equipment[options[i]].push(charSheet.equipment.backpack[options[i]][index]);
  charSheet.equipment.backpack[options[i]].splice(index, 1);
};

// EXPORT

module.exports = {
  mainMenu,
  createCharacter,
  modifierCalculator,
  loadChars,
  characterMenu
};
