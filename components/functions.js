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
  calculateATK(charSheet);
  calculateAC(charSheet);

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
};

const calculateATK = (charSheet) => {
  charSheet.ATK = charSheet.modifiers.DexMOD + charSheet.proficiency;
};

const calculateAC = (charSheet) => {
  charSheet.AC = charSheet.modifiers.DexMOD + 10;
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

// SHOP

const shop = (charSheet) => {
  while (true) {
    clear();
    design.inventoryDesign(charSheet);
    let answers = ['Armor', 'Shield', 'Weapon', 'Potion', 'Ring', 'Amulet'];
    let index = readlineSync.keyInSelect(answers, '', {cancel: 'Exit from Shop'});
    if (index === 0) {
      shopArmor(charSheet);
    } else if (index === 1) {
      shopShield(charSheet);
    } else if (index === 2) {
      shopWeapon(charSheet);
    } else if (index === 3) {
      shopPotion(charSheet);
    } else if (index === 4) {
      shopRing(charSheet);
    } else if (index === 5) {
      shopAmulet(charSheet);
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
    armorList.push(`${item.name} | ${item.AC} AC | ${item.reqStr} min.Str. | ${item.price} gold`);
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

const shopShield = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let shieldList = [];
  items.shieldList.forEach(item => {
    shieldList.push(`${item.name} | ${item.AC} AC | ${item.price} gold`);
  });
  let indexShield = readlineSync.keyInSelect(shieldList, '', {cancel: 'Back'});

  if (indexShield === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.shieldList[indexShield].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.shieldList[indexShield].price;
    charSheet.equipment.backpack.shield.push(items.shieldList[indexShield]);
  }
};

const shopWeapon = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let weaponList = [];
  items.weaponList.forEach(item => {
    weaponList.push(`${item.name} | ${item.dmgDisplay} dmg | ${item.price} gold`);
  });
  let indexWeapon = readlineSync.keyInSelect(weaponList, '', {cancel: 'Back'});

  if (indexWeapon === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.weaponList[indexWeapon].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.weaponList[indexWeapon].price;
    charSheet.equipment.backpack.weapon.push(items.weaponList[indexWeapon]);
  }
};

const shopPotion = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let potionList = [];
  items.potionList.forEach(item => {
    potionList.push(`${item.name} | ${item.healDisplay} HP | ${item.price} gold`);
  });
  let indexPotion = readlineSync.keyInSelect(potionList, '', {cancel: 'Back'});

  if (indexPotion === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.potionList[indexPotion].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.potionList[indexPotion].price;
    charSheet.equipment.backpack.potion.push(items.potionList[indexPotion]);
  }
};

const shopRing = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let ringList = [];
  items.ringList.forEach(item => {
    ringList.push(`${item.name} | ${item.AC} AC | ${item.ATK} ATK | ${item.price} gold`);
  });
  let indexRing = readlineSync.keyInSelect(ringList, '', {cancel: 'Back'});

  if (indexRing === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.ringList[indexRing].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.ringList[indexRing].price;
    charSheet.equipment.backpack.ring.push(items.ringList[indexRing]);
  }
};

const shopAmulet = (charSheet) => {
  clear();
  design.inventoryDesign(charSheet);

  let amuletList = [];
  items.amuletList.forEach(item => {
    amuletList.push(`${item.name} | ${item.AC} AC | ${item.ATK} ATK | ${item.price} gold`);
  });
  let indexAmulet = readlineSync.keyInSelect(amuletList, '', {cancel: 'Back'});

  if (indexAmulet === -1) {
    return;
  }

  clear();
  design.inventoryDesign(charSheet);

  if (items.amuletList[indexAmulet].price > charSheet.gold) {
    readlineSync.question('Not enough gold! Press enter to continue...');
  } else {
    charSheet.gold -= items.amuletList[indexAmulet].price;
    charSheet.equipment.backpack.amulet.push(items.amuletList[indexAmulet]);
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
