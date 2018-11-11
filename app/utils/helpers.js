const R = require('ramda');
const Re = require('ramda-extension');

const {
  MAX_VALUE,
  MIN_VALUE,
  MED_VALUE,
  MIN_INCREMENT,
  MAX_INCREMENT
} = require("../config/constants");

const generateRandom = (max, min = 0) => Math.floor(min + Math.random() * (max - min + 1));

const assignOrRandom = (value) => value || generateRandom(MAX_VALUE, MED_VALUE);

const mapIndexed = R.addIndex(R.map);

const indexedList = mapIndexed((val, idx) => `${idx + 1}-> ${Re.toPascalCase(val)}`);


const minIncrement = value => R.add(MIN_INCREMENT, value);
const minDecrement = value => R.subtract(value, MIN_INCREMENT);
const incOrDec = (action) => (value) =>
  action == 'inc' ? minIncrement(value) : minDecrement(value);

const updateWithinThreshold = (action) => R.compose(
  R.clamp(MIN_VALUE, MAX_VALUE),
  incOrDec(action)
);

const incWithinThreshold = updateWithinThreshold('inc');
const decWithinThreshold = updateWithinThreshold('dec');

const resetTo = (value) => R.always(value);

module.exports = {
  generateRandom,
  assignOrRandom,
  mapIndexed,
  indexedList,
  incWithinThreshold,
  decWithinThreshold,
  resetTo
}