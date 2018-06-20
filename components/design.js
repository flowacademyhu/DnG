const {table} = require('table');

const logo = () => {
  console.log('▄▀▀█▄▄   ▄▀▀▄ ▄▀▀▄  ▄▀▀▄ ▀▄  ▄▀▀▀▀▄   ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄   ▄▀▀▄ ▀▄  ▄▀▀▀▀▄            ');
  console.log('█ ▄▀   █ █   █    █ █  █ █ █ █        ▐  ▄▀   ▐ █      █ █  █ █ █ █ █   ▐            ');
  console.log('▐ █    █ ▐  █    █  ▐  █  ▀█ █    ▀▄▄   █▄▄▄▄▄  █      █ ▐  █  ▀█    ▀▄              ');
  console.log('  █    █   █    █     █   █  █     █ █  █    ▌  ▀▄    ▄▀   █   █  ▀▄   █             ');
  console.log(' ▄▀▄▄▄▄▀    ▀▄▄▄▄▀  ▄▀   █   ▐▀▄▄▄▄▀ ▐ ▄▀▄▄▄▄     ▀▀▀▀   ▄▀   █    █▀▀▀              ');
  console.log('█     ▐             █    ▐   ▐         █    ▐            █    ▐    ▐                 ');
  console.log(' ▐                   ▐                  ▐                 ▐                           ');
  console.log('                         ▄▀▀█▄   ▄▀▀▄ ▀▄  ▄▀▀█▄▄                                     ');
  console.log('                        ▐ ▄▀ ▀▄ █  █ █ █ █ ▄▀   █                                    ');
  console.log('                          █▄▄▄█ ▐  █  ▀█ ▐ █    █                                    ');
  console.log('                         ▄▀   █   █   █    █    █                                    ');
  console.log('                        █   ▄▀  ▄▀   █    ▄▀▄▄▄▄▀                                    ');
  console.log('                         ▐   ▐   █    ▐   █     ▐                                     ');
  console.log('                               ▐        ▐                                           ');
  console.log('▄▀▀▀▀▄   ▄▀▀▀▀▄      ▄▀▀█▄   ▄▀▀█▄▄   ▄▀▀█▀▄    ▄▀▀█▄   ▄▀▀▀█▀▀▄  ▄▀▀▀▀▄   ▄▀▀▄▀▀▀▄  ▄▀▀▀▀▄ ');
  console.log('█        █    █      ▐ ▄▀ ▀▄ █ ▄▀   █ █   █  █  ▐ ▄▀ ▀▄ █    █  ▐ █      █ █   █   █ █ █   ▐ ');
  console.log('█    ▀▄▄ ▐    █        █▄▄▄█ ▐ █    █ ▐   █  ▐    █▄▄▄█ ▐   █     █      █ ▐  █▀▀█▀     ▀▄   ');
  console.log('█     █ █    █        ▄▀   █   █    █     █      ▄▀   █    █      ▀▄    ▄▀  ▄▀    █  ▀▄   █  ');
  console.log('▐▀▄▄▄▄▀ ▐  ▄▀▄▄▄▄▄▄▀ █   ▄▀   ▄▀▄▄▄▄▀  ▄▀▀▀▀▀▄  █   ▄▀   ▄▀         ▀▀▀▀   █     █    █▀▀▀   ');
  console.log('▐          █         ▐   ▐   █     ▐  █       █ ▐   ▐   █                  ▐     ▐    ▐      ');
  console.log('   ▐                 ▐        ▐       ▐         ▐                                    ');
};

// SHEET DESIGN

const sheetDesign = (charSheet) => {
  let designTable = [
    ['Level:', charSheet.lvl, 'Experience:', charSheet.exp, 'Name:', charSheet.name],
    ['Health:', charSheet.HP, ' ', ' ', 'Race:', charSheet.race],
    ['AC:', charSheet.AC, 'Init:', charSheet.init, 'Gold:', charSheet.gold],
    ['Prof:', charSheet.proficiency, 'ATK:', charSheet.ATK, 'Armor:', show(charSheet, 0, 0)],
    ['Strength (Str):', charSheet.attributes.Str, 'Str Modifier:', charSheet.modifiers.StrMOD, 'Weapon/Shield:', `${show(charSheet, 1, 0)}/${show(charSheet, 2, 0)}`],
    ['Dexterity (Dex):', charSheet.attributes.Dex, 'Dex Modifier:', charSheet.modifiers.DexMOD, 'Ring:', show(charSheet, 3, 0)],
    ['Constitution (Con):', charSheet.attributes.Con, 'Con Modifier:', charSheet.modifiers.ConMOD, 'Amulet:', show(charSheet, 4, 0)],
    ['Intelligence (Int):', charSheet.attributes.Int, 'Int Modifier:', charSheet.modifiers.IntMOD, 'Pocket Slot 1:', show(charSheet, 5, 0)],
    ['Wisdom (Wis):', charSheet.attributes.Wis, 'Wis Modifier:', charSheet.modifiers.WisMOD, 'Pocket Slot 2:', show(charSheet, 5, 1)],
    ['Charisma (Cha):', charSheet.attributes.Cha, 'Cha Modifier:', charSheet.modifiers.ChaMOD, 'Pocket Slot 3:', show(charSheet, 5, 2)]
  ];

  let config = {
    columns: {
      0: {
        alignment: 'right',
        width: 20
      },
      1: {
        alignment: 'center',
        width: 5
      },
      2: {
        alignment: 'right',
        width: 20
      },
      3: {
        alignment: 'center',
        width: 5
      },
      4: {
        alignment: 'right',
        width: 15
      },
      5: {
        alignment: 'center',
        width: 30
      }
    }
  };

  console.log(table(designTable, config));
};

const show = (charSheet, i, j) => {
  let list = ['armor', 'weapon', 'shield', 'ring', 'amulet', 'potion'];

  if (charSheet.equipment[list[i]][j].length > 0) {
    return charSheet.equipment[list[i]][j].name;
  } else {
    return '-';
  }
};

// INVENTORY DESIGN

const inventoryDesign = (charSheet) => {
  let designTable = [
    [' ', `Gold:`, charSheet.gold, ' '],
    [' ', 'Armors:', 'Shields:', 'Weapons:'],
    [' ', backpackAll(charSheet, 0)[0], backpackAll(charSheet, 1)[0], backpackAll(charSheet, 2)[0]],
    [' ', backpackAll(charSheet, 0)[1], backpackAll(charSheet, 1)[1], backpackAll(charSheet, 2)[1]],
    [' ', backpackAll(charSheet, 0)[2], backpackAll(charSheet, 1)[2], backpackAll(charSheet, 2)[2]],
    [' ', backpackAll(charSheet, 0)[3], backpackAll(charSheet, 1)[3], backpackAll(charSheet, 2)[3]],
    [' ', backpackAll(charSheet, 0)[4], backpackAll(charSheet, 1)[4], backpackAll(charSheet, 2)[4]],
    [' ', backpackAll(charSheet, 0)[5], backpackAll(charSheet, 1)[5], backpackAll(charSheet, 2)[5]],
    [' ', 'Potions:', 'Rings:', 'Amulets:'],
    [' ', backpackAll(charSheet, 3)[0], backpackAll(charSheet, 4)[0], backpackAll(charSheet, 5)[0]],
    [' ', backpackAll(charSheet, 3)[1], backpackAll(charSheet, 4)[1], backpackAll(charSheet, 5)[1]],
    [' ', backpackAll(charSheet, 3)[2], backpackAll(charSheet, 4)[2], backpackAll(charSheet, 5)[2]],
    [' ', backpackAll(charSheet, 3)[3], backpackAll(charSheet, 4)[3], backpackAll(charSheet, 5)[3]],
    [' ', backpackAll(charSheet, 3)[4], backpackAll(charSheet, 4)[4], backpackAll(charSheet, 5)[4]],
    [' ', backpackAll(charSheet, 3)[5], backpackAll(charSheet, 4)[5], backpackAll(charSheet, 5)[5]]
  ];

  let config = {
    columns: {
      0: {
        width: 1
      },
      1: {
        width: 40
      },
      2: {
        width: 40
      },
      3: {
        width: 40
      }
    }
  };

  console.log(table(designTable, config));
};

const backpackAll = (charSheet, i) => {
  let choice = ['armor', 'shield', 'weapon', 'potion', 'ring', 'amulet'];

  let list = [];

  if (charSheet.equipment[choice[i]].length > 0) {
    if (i === 0 || i === 1) {
      list.push(`[X] ${charSheet.equipment[choice[i]][0].name} | ${charSheet.equipment[choice[i]][0].AC} AC`);
    } else if (i === 2) {
      list.push(`[X] ${charSheet.equipment[choice[i]][0].name} | ${charSheet.equipment[choice[i]][0].dmgDisplay} dmg`);
    } else if (i === 3) {
      charSheet.equipment[choice[i]].forEach(element => {
        list.push(`[X] ${element.name} | ${element.healDisplay} HP`);
      });
    } else if (i === 4 || i === 5) {
      list.push(`[X] ${charSheet.equipment[choice[i]][0].name} | ${charSheet.equipment[choice[i]][0].AC} AC | ${charSheet.equipment[choice[i]][0].ATK} ATK`);
    }
  }

  charSheet.equipment.backpack[choice[i]].forEach(element => {
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

  return list;
};

module.exports = {
  logo,
  sheetDesign,
  inventoryDesign
};
