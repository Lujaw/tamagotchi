const R = require('ramda');
const Re = require('ramda-extension');

const { incWithinThreshold, decWithinThreshold, resetTo } = require('../utils/helpers');

const { MAX_VALUE, MIN_VALUE } = require("../config/constants")

const nonUserActions = ['poop', 'sleep'];

const actions = {
  "feed": {
    "hunger": resetTo(MIN_VALUE),
    "energy": decWithinThreshold,
    // "health": incWithinThreshold,
    "happiness": incWithinThreshold,
  },
  "put to bed": {
    "energy": resetTo(MAX_VALUE),
    "hunger": incWithinThreshold,
    // "health": incWithinThreshold,
    "happiness": incWithinThreshold
  },
  "sleep": {
    "energy": resetTo(MAX_VALUE),
    "hunger": incWithinThreshold,
    // "health": incWithinThreshold,
    "happiness": incWithinThreshold
  },
  "play": {
    "happiness": incWithinThreshold,
    "energy": decWithinThreshold,
    // "health": incWithinThreshold,
    "hunger": incWithinThreshold
  },
  "poop": {
    "bowel": resetTo(MIN_VALUE),
    "hunger": incWithinThreshold,
    "energy": decWithinThreshold,
    // "health": R.identity
  }

};

const die = (name, message) => {
  console.log(`${name} has succumbed to ${message} and has gone to paradise`);
  process.exit()
}

const invoke = stats => action =>
  console.log("action -->",action, stats) ||
  R.evolve(actions[action])(stats);

const omitKeysAndSort = omitKeys => R.compose(
  R.sort(alphabeticCompare),
  R.without(omitKeys),
  R.keys
);

const alphabeticCompare = (a, b) => R.toLower(a).localeCompare(R.toLower(b));

const omitNonUserActions = omitKeysAndSort(nonUserActions);

const actionList = omitNonUserActions(actions);

module.exports = {
  invoke,
  die,
  actionList,
  decWithinThreshold,
  incWithinThreshold
}