const R = require('ramda');
const Re = require('ramda-extension');

const {
  MAX_THRESHOLD,
  MIN_THRESHOLD,
  MED_THRESHOLD,
  MIN_INCREMENT,
  MAX_INCREMENT
} = require("../config/constants");

const generateRandom = (max, min = 0) => Math.floor(min + Math.random() * (max - min + 1));

const assignOrRandom = (value) => value || generateRandom(MAX_THRESHOLD, MED_THRESHOLD);

const mapIndexed = R.addIndex(R.map);

const indexedList = mapIndexed((val, idx) => `${idx + 1}-> ${Re.toPascalCase(val)}`);


const incOrDec = (action) => (value) =>
  action == 'inc' ? R.inc(value) : R.dec(value);

const updateWithinThreshold = (action) => R.compose(
  R.clamp(MIN_THRESHOLD, MAX_THRESHOLD),
  incOrDec(action)
);

const incWithinThreshold = updateWithinThreshold('inc');
const decWithinThreshold = updateWithinThreshold('dec');

module.exports = {
  generateRandom,
  assignOrRandom,
  mapIndexed,
  indexedList,
  incWithinThreshold,
  decWithinThreshold
}