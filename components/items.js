const dice = require('./dice.js');

const slotType = {
  oneHandedWeapon: {
    armor: false,
    backpack: true,
    mainHand: true,
    offHand: true,
    twoHanded: false,
    pocket: false,
    ring: false,
    amulet: false
  },
  armor: {
    armor: true,
    backpack: true,
    mainHand: false,
    offHand: false,
    twoHanded: false,
    pockets: false,
    ring: false,
    amulet: false
  },
  shield: {
    armor: false,
    backpack: true,
    mainHand: false,
    offHand: true,
    twoHanded: false,
    pockets: false,
    ring: false,
    amulet: false
  },
  twoHanded: {
    armor: false,
    backpack: true,
    mainHand: false,
    offHand: false,
    twoHanded: true,
    pockets: false,
    ring: false,
    amulet: false
  },
  potion: {
    armor: false,
    backpack: true,
    mainHand: false,
    offHand: false,
    twoHanded: false,
    pockets: true,
    ring: false,
    amulet: false
  },
  ring: {
    armor: false,
    backpack: true,
    mainHand: false,
    offHand: false,
    twoHanded: false,
    pockets: false,
    ring: true,
    amulet: false
  },
  amulet: {
    armor: false,
    backpack: true,
    mainHand: false,
    offHand: false,
    twoHanded: false,
    pockets: false,
    ring: false,
    amulet: true
  }
};

const armorList = [
  {
    name: 'Leather armor',
    ID: 'IA0001',
    AC: 1,
    armorType: 'light',
    price: 20,
    slots: slotType.armor
  },
  {
    name: 'Shield',
    ID: 'IA0002',
    AC: 2,
    price: 60,
    slots: slotType.shield
  },
  {
    name: 'Chain shirt',
    ID: 'IA0003',
    AC: 3,
    armorType: 'medium',
    price: 100,
    slots: slotType.armor
  },
  {
    name: 'Chain mail',
    ID: 'IA0004',
    AC: 6,
    armorType: 'heavy',
    price: 150,
    slots: slotType.armor
  }
];

const weaponList = [
  {
    name: 'Dagger',
    ID: 'IW0001',
    dmg: dice.roll(1, 6),
    price: 10,
    slots: slotType.oneHandedWeapon
  },
  {
    name: 'Longsword',
    ID: 'IW0002',
    dmg: dice.roll(1, 10),
    price: 60,
    slots: slotType.oneHandedWeapon
  },
  {
    name: 'Shortsword',
    ID: 'IW0003',
    dmg: dice.roll(1, 8),
    price: 40,
    slots: slotType.oneHandedWeapon
  }
];

const miscList = [
  {
    name: 'Small HP potion',
    ID: 'IM0001',
    price: 20,
    slots: slotType.potion,
    heal: dice.roll(1, 8) + 2
  },
  {
    name: 'Medium HP potion',
    ID: 'IM0002',
    price: 80,
    slots: slotType.potion,
    heal: dice.roll(2, 8) + 2
  },
  {
    name: 'Small HP potion',
    ID: 'IM0003',
    price: 120,
    slots: slotType.potion,
    heal: dice.roll(2, 8) + 6
  },
  {
    name: 'Ring of Protection',
    ID: 'IM0004',
    price: 300,
    slots: slotType.ring,
    AC: 1
  }
];

module.exports = {
  slotType,
  armorList,
  weaponList,
  miscList
};
