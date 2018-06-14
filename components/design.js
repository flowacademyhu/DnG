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

const sheetDesign = (charSheet) => {
  let designTable = [
    ['Level:', charSheet.lvl, 'Experience:', charSheet.exp, 'Name:', charSheet.name],
    ['Health:', charSheet.HP, 'Temporal HP:', charSheet.tempHP, 'Race:', charSheet.race],
    ['AC:', charSheet.AC, 'Init:', charSheet.init, 'Gold:', charSheet.gold],
    ['Prof:', charSheet.proficiency, '', '', 'Armor:', charSheet.equipment.armor],
    ['Strength (Str):', charSheet.attributes.Str, 'Str Modifier:', charSheet.modifiers.StrMOD, 'Weapon:', charSheet.equipment.weapon],
    ['Dexterity (Dex):', charSheet.attributes.Dex, 'Dex Modifier:', charSheet.modifiers.DexMOD, 'Ring:', charSheet.equipment.ring],
    ['Constitution (Con):', charSheet.attributes.Con, 'Con Modifier:', charSheet.modifiers.ConMOD, 'Amulet:', charSheet.equipment.amulet],
    ['Intelligence (Int):', charSheet.attributes.Int, 'Int Modifier:', charSheet.modifiers.IntMOD, 'Pocket Slot 1:', charSheet.equipment.pockets[0]],
    ['Wisdom (Wis):', charSheet.attributes.Wis, 'Wis Modifier:', charSheet.modifiers.WisMOD, 'Pocket Slot 2:', charSheet.equipment.pockets[1]],
    ['Charisma (Cha):', charSheet.attributes.Cha, 'Cha Modifier:', charSheet.modifiers.ChaMOD, 'Pocket Slot 3:', charSheet.equipment.pockets[2]]
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

const inventoryDesign = (charSheet) => {
  let backpackListArmor = backpackArmor(charSheet);

  let designTable = [
    [`Gold:`, charSheet.gold, ' ', ' ', ' ', ' ', ' ', ''],
    ['Armor:', charSheet.equipment.armor, ' ', 'Backpack Armors', ' Backpack Weapons', 'Backpack Rings', 'Backpack Amulets', 'Backpack Potions'],
    ['Weapon:', charSheet.equipment.weapon, ' ', backpackListArmor[0], '', '', '', ''],
    ['Ring:', charSheet.equipment.ring, ' ', backpackListArmor[1], '', '', '', ''],
    ['Amulet:', charSheet.equipment.amulet, ' ', backpackListArmor[2], '', '', '', ''],
    ['Pocket Slot 1:', charSheet.equipment.pockets[0], ' ', backpackListArmor[3], '', '', '', ''],
    ['Pocket Slot 2:', charSheet.equipment.pockets[1], ' ', backpackListArmor[4], '', '', '', ''],
    ['Pocket Slot 3:', charSheet.equipment.pockets[2], ' ', backpackListArmor[5], '', '', '', '']
  ];

  let config = {
    columns: {
      0: {
        width: 20
      },
      1: {
        width: 20
      },
      2: {
        width: 1
      }
    }
  };

  console.log(table(designTable, config));
};

const backpackArmor = (charSheet) => {
  let backpackListArmor = [];
  charSheet.equipment.backpack.armor.forEach(element => {
    backpackListArmor.push(`${element.name} | ${element.AC} AC`);
  });
  return backpackListArmor;
};

module.exports = {
  logo,
  sheetDesign,
  inventoryDesign
};
