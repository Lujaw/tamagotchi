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

const capitalizeKeys = Re.mapKeysWithValue((k,v) => Re.toUpperFirst(k))

const progressBar = (value, char = '#') =>{
  const length = Math.floor(MAX_VALUE/10);
  return `[${Array(length).fill("_").fill(char, 0, value).join('')}]`;
}

const getStateProgress = Re.mapKeysAndValues(([a, b]) =>
  [Re.toUpperFirst(a), progressBar(b)]);

const sanitizeState = (state = "") => state.replace(/\'|\"|{|}/gm, "").replace(/,/gm, "\t").replace(/:/gm, ":\t");


const exitWithMessage = (message) =>{
  console.log(message);
  process.exit();
}

const isProdEnv = () => process.env.NODE_ENV === 'prod'


module.exports = {
  generateRandom,
  assignOrRandom,
  incWithinThreshold,
  decWithinThreshold,
  resetTo,
  capitalizeKeys,
  progressBar,
  getStateProgress,
  sanitizeState,
  exitWithMessage,
  isProdEnv
}