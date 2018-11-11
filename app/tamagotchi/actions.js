const R = require('ramda');
const Re = require('ramda-extension');

const { incWithinThreshold, decWithinThreshold } = require('../utils/helpers');


const actions = {
  "feed": {
    "hunger": incWithinThreshold
  },
  "putToBed": {
    "energy":incWithinThreshold
  },
  "sleep": {
    "energy":incWithinThreshold
  },
  "pet": {
    "happiness":incWithinThreshold
  },
  "poop": {
    "bowel":incWithinThreshold
  },
  "age": {
    "birthDate":incWithinThreshold
  },

};

const nonUserActions = ['poop', 'age', 'sleep'];

const invoke = stats => action =>
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