const dice = require('./dice.js');

const armorList = [
  {
    name: 'Leather',
    AC: 1,
    maxDexMod: 5,
    price: 20
  },
  {
    name: 'Studded Leather',
    AC: 2,
    maxDexMod: 5,
    price: 90
  },
  {
    name: 'Hide',
    AC: 2,
    maxDexMod: 2,
    price: 20
  },
  {
    name: 'Chain shirt',
    AC: 3,
    maxDexMod: 2,
    price: 100
  },
  {
    name: 'Breastplate',
    AC: 4,
    maxDexMod: 2,
    price: 800
  },
  {
    name: 'Half Plate',
    AC: 5,
    maxDexMod: 2,
    price: 1500
  },
  {
    name: 'Ring mail',
    AC: 4,
    maxDexMod: 0,
    price: 60
  },
  {
    name: 'Chain mail',
    AC: 6,
    maxDexMod: 0,
    price: 150
  },
  {
    name: 'Splint',
    AC: 7,
    maxDexMod: 0,
    price: 400
  },
  {
    name: 'Plate',
    AC: 8,
    maxDexMod: 0,
    price: 3000
  }
];

const shieldList = [
  {
    name: 'Small Shield',
    AC: 2,
    price: 100
  },
  {
    name: 'Medium Shield',
    AC: 3,
    price: 200
  },
  {
    name: 'Large Shield',
    AC: 4,
    price: 300
  }
];

const weaponList = [
  {
    name: 'Dagger',
    dmgDisplay: '1-6',
    dmg: dice.roll(1, 6),
    price: 10,
    type: 'onehanded'
  },
  {
    name: 'Longsword',
    dmgDisplay: '1-10',
    dmg: dice.roll(1, 10),
    price: 60,
    type: 'onehanded'
  },
  {
    name: 'Shortsword',
    dmgDisplay: '1-8',
    dmg: dice.roll(1, 8),
    price: 40,
    type: 'onehanded'
  }
];

const potionList = [
  {
    name: 'Small HP potion',
    price: 20,
    healDisplay: '3-10',
    heal: dice.roll(1, 8) + 2
  },
  {
    name: 'Medium HP potion',
    price: 80,
    healDisplay: '4-18',
    heal: dice.roll(2, 8) + 2
  },
  {
    name: 'Great HP potion',
    price: 120,
    healDisplay: '8-22',
    heal: dice.roll(2, 8) + 6
  }
];

const ringList = [
  {
    name: 'Ring of Protection',
    price: 300,
    AC: 1,
    ATK: 0
  },
  {
    name: 'Ring of Greater Protection',
    price: 600,
    AC: 2,
    ATK: 0
  },
  {
    name: 'Ring of Power',
    price: 300,
    AC: 0,
    ATK: 1
  },
  {
    name: 'Ring of Greater Power',
    price: 600,
    AC: 0,
    ATK: 2
  },
  {
    name: 'Ring of the Warrior',
    price: 600,
    AC: 1,
    ATK: 1
  },
  {
    name: 'Ring of the Knight',
    price: 1200,
    AC: 2,
    ATK: 2
  },
  {
    name: 'Ring of the King',
    price: 1800,
    AC: 3,
    ATK: 3
  }
];

const amuletList = [
  {
    name: 'Amulet of the Warrior',
    price: 1000,
    AC: 1,
    ATK: 1
  },
  {
    name: 'Amulet of the Knight',
    price: 2000,
    AC: 2,
    ATK: 2
  },
  {
    name: 'Amulet of the King',
    price: 3000,
    AC: 3,
    ATK: 3
  }
];

module.exports = {
  armorList,
  shieldList,
  weaponList,
  potionList,
  ringList,
  amuletList
};
