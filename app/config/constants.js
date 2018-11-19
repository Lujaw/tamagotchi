// All the constant values are to be stored here
const TIME_STEP = 15000; // loop interval time in milliseconds
const MAX_VALUE = 100;
const MIN_VALUE = 0;
const MAX_AGE = 100; // it is approx 4 hrs for now
const MED_VALUE = 0.50 * MAX_VALUE;
const LOWER_THRESHOLD = 0.15 * MAX_VALUE;
const UPPER_THRESHOLD = 0.85 * MAX_VALUE;
const MIN_INCREMENT = 0.1 * MAX_VALUE;
const MAX_INCREMENT = 0.2 * MAX_VALUE;
const DEFAULT_NAME = 'Tamagotchi';


module.exports = {
  TIME_STEP,
  MAX_VALUE,
  MIN_VALUE,
  MED_VALUE,
  LOWER_THRESHOLD,
  UPPER_THRESHOLD,
  MIN_INCREMENT,
  MAX_INCREMENT,
  MAX_AGE,
  DEFAULT_NAME
};
