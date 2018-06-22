const dice = require('./dice.js');

const armorList = [
  {
    name: 'Leather',
    AC: 1,
    price: 50
  },
  {
    name: 'Studded Leather',
    AC: 2,
    price: 200
  },
  {
    name: 'Chain shirt',
    AC: 3,
    price: 450
  },
  {
    name: 'Breastplate',
    AC: 4,
    price: 800
  },
  {
    name: 'Half Plate',
    AC: 5,
    price: 1600
  },
  {
    name: 'Plate',
    AC: 6,
    price: 3000
  }
];

const shieldList = [
  {
    name: 'Shield',
    AC: 2,
    price: 200
  }
];

const weaponList = [
  {
    name: 'Rusty Dagger',
    dmgDisplay: '1-4',
    dmg: () => {
      return dice.roll(1, 4);
    },
    price: 0,
    type: 'onehanded'
  },
  {
    name: 'Dagger',
    dmgDisplay: '1-6',
    dmg: () => {
      return dice.roll(1, 6);
    },
    price: 10,
    type: 'onehanded'
  },
  {
    name: 'Battle Axe',
    dmgDisplay: '1-12',
    dmg: () => {
      return dice.roll(1, 12);
    },
    price: 300,
    type: 'onehanded'
  },
  {
    name: 'Longsword',
    dmgDisplay: '1-10',
    dmg: () => {
      return dice.roll(1, 10);
    },
    price: 60,
    type: 'onehanded'
  },
  {
    name: 'Shortsword',
    dmgDisplay: '1-8',
    dmg: () => {
      return dice.roll(1, 8);
    },
    price: 40,
    type: 'onehanded'
  },
  {
    name: 'Greatsword',
    dmgDisplay: '2-12',
    dmg: () => {
      return dice.roll(2, 6);
    },
    price: 200,
    type: 'twohanded'
  },
  {
    name: 'Greataxe',
    dmgDisplay: '1-12',
    dmg: () => {
      return dice.roll(1, 12);
    },
    price: 120,
    type: 'twohanded'
  },
  {
    name: 'Sword of Flames',
    dmgDisplay: '2-16',
    dmg: () => {
      return dice.roll(1, 10) + dice.roll(1, 6);
    },
    price: 2000,
    type: 'onehanded'
  }
];

const potionList = [
  {
    name: 'Small HP potion',
    price: 20,
    healDisplay: '3-10',
    heal: () => {
      return dice.roll(1, 8) + 2;
    }
  },
  {
    name: 'Medium HP potion',
    price: 80,
    healDisplay: '4-18',
    heal: () => {
      return dice.roll(2, 8) + 2;
    }
  },
  {
    name: 'Great HP potion',
    price: 120,
    healDisplay: '8-22',
    heal: () => {
      return dice.roll(2, 8) + 6;
    }
  }
];

const ringList = [
  {
    name: 'Ring of Protection',
    price: 500,
    AC: 1,
    ATK: 0
  },
  {
    name: 'Ring of Greater Protection',
    price: 1500,
    AC: 2,
    ATK: 0
  },
  {
    name: 'Ring of Power',
    price: 900,
    AC: 0,
    ATK: 1
  },
  {
    name: 'Ring of Greater Power',
    price: 1200,
    AC: 0,
    ATK: 2
  }
];

const amuletList = [
  {
    name: 'Amulet of the Warrior',
    price: 5000,
    AC: 1,
    ATK: 1
  },
  {
    name: 'Amulet of the Knight',
    price: 10000,
    AC: 2,
    ATK: 2
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
