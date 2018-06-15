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
    ['Strength (Str):', charSheet.attributes.Str, 'Str Modifier:', charSheet.modifiers.StrMOD, 'Weapon/Shield:', `${charSheet.equipment.weapon[0].name} | ${charSheet.equipment.shield[0].name}`],
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
  let backpackListPotion = backpackPotion(charSheet);
  let backpackListRing = backpackRing(charSheet);
  let backpackListAmulet = backpackAmulet(charSheet);

  let designTable = [
    [' ', `Gold:`, charSheet.gold, ' '],
    [' ', 'Armors:', 'Shields:', 'Weapons:'],
    [' ', backpackListArmor[0], backpackListShield[0], backpackListWeapon[0]],
    [' ', backpackListArmor[1], backpackListShield[1], backpackListWeapon[1]],
    [' ', backpackListArmor[2], backpackListShield[2], backpackListWeapon[2]],
    [' ', backpackListArmor[3], backpackListShield[3], backpackListWeapon[3]],
    [' ', backpackListArmor[4], backpackListShield[4], backpackListWeapon[4]],
    [' ', backpackListArmor[5], backpackListShield[5], backpackListWeapon[5]],
    [' ', 'Potions:', 'Rings:', 'Amulets:'],
    [' ', backpackListPotion[0], backpackListRing[0], backpackListAmulet[0]],
    [' ', backpackListPotion[1], backpackListRing[1], backpackListAmulet[1]],
    [' ', backpackListPotion[2], backpackListRing[2], backpackListAmulet[2]],
    [' ', backpackListPotion[3], backpackListRing[3], backpackListAmulet[3]],
    [' ', backpackListPotion[4], backpackListRing[4], backpackListAmulet[4]],
    [' ', backpackListPotion[5], backpackListRing[5], backpackListAmulet[5]]
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

const backpackArmor = (charSheet) => {
  let backpackListArmor = [];

  if (charSheet.equipment.armor.length > 0) {
    backpackListArmor.push(`[X] ${charSheet.equipment.armor[0].name} | ${charSheet.equipment.armor[0].AC} AC | ${charSheet.equipment.armor[0].maxDexMod} max.Dex.Mod.`);
  }

  charSheet.equipment.backpack.armor.forEach(element => {
    backpackListArmor.push(`${element.name} | ${element.AC} AC | ${element.maxDexMod} max.Dex.Mod`);
  });

  return backpackListArmor;
};

const backpackShield = (charSheet) => {
  let backpackListShield = [];

  if (charSheet.equipment.shield.length > 0) {
    backpackListShield.push(`[X] ${charSheet.equipment.shield[0].name} | ${charSheet.equipment.shield[0].AC} AC`);
  }

  charSheet.equipment.backpack.shield.forEach(element => {
    backpackListShield.push(`${element.name} | ${element.AC} AC`);
  });

  return backpackListShield;
};

const backpackWeapon = (charSheet) => {
  let backpackListWeapon = [];

  if (charSheet.equipment.weapon.length > 0) {
    backpackListWeapon.push(`[X] ${charSheet.equipment.weapon[0].name} | ${charSheet.equipment.weapon[0].dmgDisplay} dmg`);
  }

  charSheet.equipment.backpack.weapon.forEach(element => {
    backpackListWeapon.push(`${element.name} | ${element.dmgDisplay} dmg `);
  });

  return backpackListWeapon;
};

const backpackPotion = (charSheet) => {
  let backpackListPotion = [];

  if (charSheet.equipment.potion.length > 0) {
    charSheet.equipment.potion.forEach(element => {
      backpackListPotion.push(`[X] ${element.name} | ${element.healDisplay} HP`);
    });
  }

  charSheet.equipment.backpack.potion.forEach(element => {
    backpackListPotion.push(`${element.name} | ${element.healDisplay} HP `);
  });

  return backpackListPotion;
};

const backpackRing = (charSheet) => {
  let backpackListRing = [];

  if (charSheet.equipment.ring.length > 0) {
    charSheet.equipment.ring.forEach(element => {
      backpackListRing.push(`[X] ${element.name} | ${element.AC} AC | ${element.ATK} ATK`);
    });
  }

  charSheet.equipment.backpack.ring.forEach(element => {
    backpackListRing.push(`${element.name} | ${element.AC} AC | ${element.ATK} ATK`);
  });

  return backpackListRing;
};

const backpackAmulet = (charSheet) => {
  let backpackListAmulet = [];

  if (charSheet.equipment.amulet.length > 0) {
    charSheet.equipment.amulet.forEach(element => {
      backpackListAmulet.push(`[X] ${element.name} | ${element.AC} AC | ${element.ATK} ATK`);
    });
  }

  charSheet.equipment.backpack.amulet.forEach(element => {
    backpackListAmulet.push(`${element.name} | ${element.AC} AC | ${element.ATK} ATK`);
  });

  return backpackListAmulet;
};

module.exports = {
  logo,
  sheetDesign,
  inventoryDesign
};
