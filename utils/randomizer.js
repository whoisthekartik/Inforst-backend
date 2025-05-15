const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
  getRandomInt,
  getRandomElement,
};