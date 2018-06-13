// roll(x darab, y oldalu kocka dobas) return osszeg
// rollAdv 2db 20 oldalu kockat dob, a nagyobb eredmenyt adja vissza
// rollDisAdv 2db 20 oldalu kockat dob, a kisebb eredmenyt adja vissza
// genAtr visszaad egy 6 elembol allo arrayt az elemek 3-18 kozott valtakoznak, atlaguk min 13

const roll = (db, side) => {
  let result = 0;
  let i = 0;
  while (i < db) {
    result += Math.floor((Math.random() * side) + 1);
    i++;
  }
  return result;
};

const rollAdv = () => {
  let i = 0;
  let x = [];
  while (i < 2) {
    x[i] = Math.floor((Math.random() * 20) + 1);
    i++;
  }
  return Math.max(x[0], x[1]);
};

const rollDisAdv = () => {
  let i = 0;
  let x = [];
  while (i < 2) {
    x[i] = Math.floor((Math.random() * 20) + 1);
    i++;
  }
  return Math.min(x[0], x[1]);
};

const sum = (array) => {
  let n = array.length;
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += array[i];
  }
  return result;
};

const min = (array) => {
  let result = array[0];
  for (let i = 0; i < array.length; i++) {
    if (result > array[i]) {
      result = array[i];
    }
  }
  return result;
};

const rollAtr = () => {
  let atr = [];
  let sumres;
  for (let i = 0; i < 4; i++) {
    atr[i] = roll(1, 6);
  }
  sumres = sum(atr) - min(atr);
  sumres -= min(atr);
  return sumres;
};

const genAtr = () => {
  let result = [];
  let sumres = 0;
  while ((sumres / 6) <= 13) {
    for (let i = 0; i < 6; i++) {
      result[i] = rollAtr();
    }
    sumres = sum(result);
  }
  return result;
};

module.exports = {
  roll: roll,
  rollAdv: rollAdv,
  rollDisAdv: rollDisAdv,
  min: min,
  rollAtr: rollAtr,
  genAtr: genAtr
};
