const R = require('ramda');

const {
  MAX_THRESHOLD,
  MIN_THRESHOLD,
  MED_THRESHOLD
} = require("../config/constants")


const generateRandom = (max, min = 0) => Math.floor(min + Math.random() * (max - min + 1));

const assignOrRandom = (value) => value || generateRandom(MAX_THRESHOLD, MED_THRESHOLD);

module.exports = {
  generateRandom,
  assignOrRandom
}