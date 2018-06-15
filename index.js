const functions = require('./components/functions');
const design = require('./components/design');
const clear = require('console-clear');

while (true) {
  clear();
  design.logo();
  let mainMenuIndex = functions.mainMenu();

  if (mainMenuIndex === 0) {
    let charSheet = functions.createCharacter();
    while (true) {
      functions.characterMenu(charSheet);
      break;
    }
  } else if (mainMenuIndex === 1) {
    let charSheet = functions.loadChars();
    while (true) {
      functions.characterMenu(charSheet);
      break;
    }
  } else if (mainMenuIndex === -1) {
    clear();
    console.log('Goodbye!');
    break;
  }
}
