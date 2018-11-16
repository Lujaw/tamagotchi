const R = require('ramda');
const Re = require('ramda-extension');
const style = require('ansi-styles');

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

const capitalizeKeys = Re.mapKeysWithValue(k => Re.toUpperFirst(k));

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
    "'": '',
    '"': '',
    '{': '',
    '}': '',
    // ',': '   ',
    ':': ': '
  };

  const regExpression = new RegExp(Object.keys(conversions).join('|'), 'gim');
  const replacer = match => conversions[match];
  try {
    const stateString = JSON.stringify(state);
    return stateString.replace(regExpression, replacer);
  } catch (e) {
    throw e;
  }
};

const addAnsiStyle = (string, styles) => 
  `${style[styles].open} ${string} ${style[styles].close}`

const encloseByChalkColor = (string, count) =>{
  if(count === 0 && !/\]|\[/.test(string)) {
    return string;
  }
  if(count <= 3) {
    return addAnsiStyle(string, "red");
  }
  if(count <= 6) {
    return addAnsiStyle(string, "yellow");
  }
  return addAnsiStyle(string, "green");
}
const findNumber = (string) => (string.match(/#/ig) || []).length;

const addChalkColor = string => encloseByChalkColor(string, findNumber(string))

const convertToStringWithProgressBar = R.compose(
  R.join(" "),
  R.map(addChalkColor),
  R.split(','),
  sanitizeObjectToString,
  objectValueToProgressBar
);


const exitWithMessage = (message) => {
  console.clear();
  console.log(`\n ${addAnsiStyle(message, 'greenBright')} \n `);
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
