const R = require('ramda');
const Re = require('ramda-extension');

const { incWithinThreshold, decWithinThreshold, resetTo, exitWithMessage } = require('../utils/helpers');

const { MAX_VALUE, MIN_VALUE } = require('../config/constants');

const nonUserActions = ['poop', 'sleep', 'die'];

const userActionHistory = [];

/** The transformation object which determines state computation when action8
 * key -> action to be applied
 * value -> object which tells which function to apply to the individual states
*/
const actions = {
  feed: {
    hunger: resetTo(MIN_VALUE),
    energy: decWithinThreshold,
    health: incWithinThreshold,
    happiness: incWithinThreshold
  },
  'put to bed': {
    energy: resetTo(MAX_VALUE),
    hunger: incWithinThreshold,
    health: incWithinThreshold,
    happiness: incWithinThreshold
  },
  play: {
    happiness: incWithinThreshold,
    energy: decWithinThreshold,
    health: incWithinThreshold,
    hunger: incWithinThreshold
  },
  poop: {
    bowel: resetTo(MIN_VALUE),
    hunger: incWithinThreshold,
    energy: decWithinThreshold,
    health: R.identity
  },
  sleep: {
    energy: resetTo(MAX_VALUE),
    hunger: incWithinThreshold,
    health: incWithinThreshold,
    happiness: incWithinThreshold
  },
  'give medicine': {
    energy: resetTo(MAX_VALUE),
    hunger: decWithinThreshold,
    health: resetTo(MAX_VALUE),
    happiness: decWithinThreshold
  },
  quit: { happiness: decWithinThreshold }
};

/**
 * Shows the given message to the user and then exits the process
 * @param  {string} name
 * @param  {string} message
 */
const die = (name, message) => {
  exitWithMessage(`${Re.toUpperFirst(name)} has succumbed to ${message} and has gone to paradise.`);
};

/**
 * Takes the current state and then applies the transformation function to the 
 * state and returns the computed state
 * @param  {object} state
 * @param  {string} action
 */
const invoke = stats => (action) => {
  userActionHistory.push(action);
  console.log('useraction', userActionHistory);
  if (action === 'quit') {
    exitWithMessage('Thanks for playing.');
  }
  return R.evolve(actions[action])(stats);
};

const alphabeticCompare = (a, b) => R.toLower(a).localeCompare(R.toLower(b));

const omitKeysAndSort = omitKeys => R.compose(
  R.sort(alphabeticCompare),
  R.without(omitKeys),
  R.keys
);

const omitNonUserActions = omitKeysAndSort(nonUserActions);

const actionList = omitNonUserActions(actions);

const isUserAction = R.contains(R.__, actionList);

module.exports = {
  invoke,
  die,
  actionList,
  decWithinThreshold,
  incWithinThreshold,
  isUserAction
};
