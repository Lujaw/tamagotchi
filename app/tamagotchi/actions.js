const R = require('ramda');
const Re = require('ramda-extension');

const {
  MAX_THRESHOLD,
  MIN_THRESHOLD,
  MED_THRESHOLD,
  MIN_INCREMENT,
  MAX_INCREMENT
} = require("../config/constants");

const incOrDec = (action) => (value) =>
  action == 'inc' ? R.inc(value) : R.dec(value);

const updateWithinThreshold = (action) => R.compose(
  R.clamp(MIN_THRESHOLD, MAX_THRESHOLD),
  incOrDec(action)
);

const incWithinThreshold = updateWithinThreshold('inc');
const decWithinThreshold = updateWithinThreshold('dec');

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

console.log(R.sortBy(R.props, actions))

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
  actionList
}