const blankCharacter = {
  name: ' ',
  attributes: {
    Str: 0,
    Dex: 0,
    Con: 0,
    Int: 0,
    Wis: 0,
    Cha: 0
  },
  modifiers: {
    StrMOD: this.attributes.Str
  },

};

console.log(blankCharacter.modifiers.Str);

module.exports = {
  blankCharacter
};
