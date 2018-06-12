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
    ['Name:', charSheet.name, 'Race:', charSheet.race],
    ['Strength (Str):', charSheet.attributes.Str, 'Str Modifier:', charSheet.modifiers.StrMOD],
    ['Dexterity (Dex):', charSheet.attributes.Dex, 'Dex Modifier:', charSheet.modifiers.DexMOD],
    ['Constitution (Con):', charSheet.attributes.Con, 'Con Modifier:', charSheet.modifiers.ConMOD],
    ['Intelligence (Int):', charSheet.attributes.Int, 'Int Modifier:', charSheet.modifiers.IntMOD],
    ['Wisdom (Wis):', charSheet.attributes.Wis, 'Wis Modifier:', charSheet.modifiers.WisMOD],
    ['Charisma (Cha):', charSheet.attributes.Cha, 'Cha Modifier:', charSheet.modifiers.ChaMOD]
  ];
  console.log(table(designTable));
};

module.exports = {
  logo,
  sheetDesign
};
