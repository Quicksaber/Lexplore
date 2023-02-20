module.exports = {
  randomStringGenerator(number) {
    let name = "";
    for (let i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * 26);
      name += String.fromCharCode(97 + random);
    }
    return name;
  },

  randomNumberGenerator(digits) {
    let number = Math.floor(Math.random() * 10 ** digits);
    return number;
  },
};
