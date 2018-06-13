const functions = require('./functions/functions');
const design = require('./design');
const clear = require('console-clear');

while (true) {
  // Main Screen
  clear();
  design.logo();
  let mainMenuIndex = functions.mainMenu();

  if (mainMenuIndex === 0) {
    let charSheet = functions.createCharacter();
    console.log(charSheet);
    break;
  } else if (mainMenuIndex === 1) {
    let charSheet = functions.loadChars();
    console.log(charSheet);
    break;
  } else if (mainMenuIndex === 2) {
    console.log('Quit');
    break;
  }
}
