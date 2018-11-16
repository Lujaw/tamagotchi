const R = require('ramda');
const Re = require('ramda-extension');

const {
  MAX_VALUE,
  MIN_VALUE,
  MED_VALUE,
  MIN_INCREMENT,
  MAX_INCREMENT
} = require('../config/constants');

const isEnv = env => R.toLower(process.env.NODE_ENV) === R.toLower(env);

const generateRandom = (max, min = 0) => Math.floor(min + Math.random() * (max - min + 1));

const assignOrRandom = value => value || generateRandom(MAX_VALUE, MED_VALUE);

// generating random value from MIN/MAX_INCREMENT for non test environment
const randomFromMinToMaxInc = isEnv('test') ? MIN_INCREMENT : generateRandom(MAX_INCREMENT, MIN_INCREMENT);

const randomIncrement = value => R.add(randomFromMinToMaxInc, value);
const randomDecrement = value => R.subtract(value, randomFromMinToMaxInc);
const divideByTen = R.divide(R.__, 10);
const incOrDec = action => value => (action === 'inc' ? randomIncrement(value) : randomDecrement(value));

const updateWithinThreshold = action => R.compose(
  R.clamp(MIN_VALUE, MAX_VALUE),
  incOrDec(action),
);

const incWithinThreshold = updateWithinThreshold('inc');
const decWithinThreshold = updateWithinThreshold('dec');

const resetTo = value => R.always(value);

const capitalizeKeys = Re.mapKeysWithValue((k, v) => Re.toUpperFirst(k));

const progressBar = (value, char = '#') => {
  const length = Math.floor(divideByTen(MAX_VALUE));
  return `[${Array(length).fill('_').fill(char, 0, divideByTen(value)).join('')}]`;
};

const numberToProgressBar = value => (Re.isNumber(value) ? progressBar(value) : value);

const objectValueToProgressBar = Re.mapKeysAndValues(
  ([a, b]) => [Re.toUpperFirst(a), numberToProgressBar(b)]
);

const sanitizeObjectToString = (state = {}) => {
  const conversions = {
    "\'": "",
    '\"': "",
    '{': "",
    '}': "",
    ',': "\t",
    ':': ": "
  };

  const regExpression = new RegExp(Object.keys(conversions).join("|"), "gim");
  const replacer = match => regexConversion[match];
  try {
    const stateString = JSON.stringify(state);
    return stateString.replace(regExpression, replacer);
  } catch (e) {
    throw e;
  }
};

const convertToStringWithProgressBar = R.compose(
  sanitizeObjectToString,
  objectValueToProgressBar,
);


const exitWithMessage = (message) => {
  console.log(message);
  process.exit();
};

const unnestAll = R.unapply(R.unnest);

module.exports = {
  generateRandom,
  assignOrRandom,
  incWithinThreshold,
  decWithinThreshold,
  resetTo,
  capitalizeKeys,
  progressBar,
  sanitizeObjectToString,
  exitWithMessage,
  isEnv,
  convertToStringWithProgressBar,
  unnestAll
};