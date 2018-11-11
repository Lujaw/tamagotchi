const R = require('ramda');
const Re = require('ramda-extension');

const { incWithinThreshold, decWithinThreshold, resetTo } = require('../utils/helpers');

const { MAX_VALUE, MIN_VALUE } = require("../config/constants")

const nonUserActions = ['poop', 'age', 'sleep'];

const actions = {
  "feed": {
    "hunger": resetTo(MIN_VALUE)
  },
  "putToBed": {
    "energy": resetTo(MAX_VALUE)
  },
  "sleep": {
    "energy": resetTo(MAX_VALUE)
  },
  "pet": {
    "happiness": incWithinThreshold
  },
  "poop": {
    "bowel": resetTo(MIN_VALUE)
  },
  "age": {
    "birthDate":incWithinThreshold
  },

};

const invoke = stats => action =>
  console.log(action) ||
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
  actionList,
  decWithinThreshold,
  incWithinThreshold
}