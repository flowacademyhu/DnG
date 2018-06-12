const functions = require('./functions');
const constants = require('./constants');
const design = require('./design');
const clear = require('console-clear');

while (true) {
  // Main Screen
  clear();
  design.logo();
  let mainMenuIndex = functions.mainMenu();

  if (mainMenuIndex === 0) {
    clear();
    design.logo();
    let charSheet = functions.newCharacter(constants.blankCharacter);
    charSheet = functions.chooseRace(charSheet);
    console.log(charSheet);
    break;
  } else if (mainMenuIndex === 1) {
    console.log('Load');
  } else if (mainMenuIndex === 2) {
    console.log('Quit');
    break;
  }
}
