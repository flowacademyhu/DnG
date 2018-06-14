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
    ['Prof:', charSheet.proficiency, 'ATK:', charSheet.ATK, 'Armor:', charSheet.equipment.armor[0].name],
    ['Strength (Str):', charSheet.attributes.Str, 'Str Modifier:', charSheet.modifiers.StrMOD, 'Weapon/Shield:', charSheet.equipment.weapon[0].name],
    ['Dexterity (Dex):', charSheet.attributes.Dex, 'Dex Modifier:', charSheet.modifiers.DexMOD, 'Ring:', charSheet.equipment.ring],
    ['Constitution (Con):', charSheet.attributes.Con, 'Con Modifier:', charSheet.modifiers.ConMOD, 'Amulet:', charSheet.equipment.amulet],
    ['Intelligence (Int):', charSheet.attributes.Int, 'Int Modifier:', charSheet.modifiers.IntMOD, 'Pocket Slot 1:', charSheet.equipment.potion[0]],
    ['Wisdom (Wis):', charSheet.attributes.Wis, 'Wis Modifier:', charSheet.modifiers.WisMOD, 'Pocket Slot 2:', charSheet.equipment.potion[1]],
    ['Charisma (Cha):', charSheet.attributes.Cha, 'Cha Modifier:', charSheet.modifiers.ChaMOD, 'Pocket Slot 3:', charSheet.equipment.potion[2]]
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
  let backpackListWeapon = backpackWeapon(charSheet);
  let backpackListShield = backpackShield(charSheet);

  let designTable = [
    [' ', `Gold:`, charSheet.gold, ' '],
    [' ', 'Armors:', 'Shields:', 'Weapons:'],
    [' ', backpackListArmor[0], backpackListShield[0], backpackListWeapon[0]],
    [' ', backpackListArmor[1], backpackListShield[1], backpackListWeapon[1]],
    [' ', backpackListArmor[2], backpackListShield[2], backpackListWeapon[2]],
    [' ', backpackListArmor[3], backpackListShield[3], backpackListWeapon[3]],
    [' ', backpackListArmor[4], backpackListShield[4], backpackListWeapon[4]],
    [' ', backpackListArmor[5], backpackListShield[5], backpackListWeapon[5]],
    [' ', 'Armors:', 'Shields:', 'Weapons:']
  ];

  let config = {
    columns: {
      0: {
        width: 1
      },
      1: {
        width: 30
      },
      2: {
        width: 30
      },
      3: {
        width: 30
      }
    }
  };

  console.log(table(designTable, config));
};

const backpackArmor = (charSheet) => {
  let backpackListArmor = [];

  if (charSheet.equipment.armor.length > 0) {
    backpackListArmor.push(`${charSheet.equipment.armor[0].name} | ${charSheet.equipment.armor[0].AC} AC | min.Str. ${charSheet.equipment.armor[0].reqStr}`);
  }

  charSheet.equipment.backpack.armor.forEach(element => {
    backpackListArmor.push(`${element.name} | ${element.AC} AC | min.Str. ${element.reqStr}`);
  });

  return backpackListArmor;
};

const backpackShield = (charSheet) => {
  let backpackListShield = [];

  if (charSheet.equipment.shield.length > 0) {
    backpackListShield.push(`${charSheet.equipment.shield[0].name} | ${charSheet.equipment.shield[0].AC} AC`);
  }

  charSheet.equipment.backpack.shield.forEach(element => {
    backpackListShield.push(`${element.name} | ${element.AC} AC`);
  });

  return backpackListShield;
};

const backpackWeapon = (charSheet) => {
  let backpackListWeapon = [];

  if (charSheet.equipment.weapon.length > 0) {
    backpackListWeapon.push(`${charSheet.equipment.weapon[0].name} | ${charSheet.equipment.weapon[0].dmgDisplay} dmg`);
  }

  charSheet.equipment.backpack.weapon.forEach(element => {
    backpackListWeapon.push(`${element.name} | ${element.dmgDisplay} dmg `);
  });

  return backpackListWeapon;
};

module.exports = {
  logo,
  sheetDesign,
  inventoryDesign
};
