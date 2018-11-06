const R = require('ramda');
const Ru = require('@panosoft/ramda-utils');

const {
  MAX_THRESHOLD,
  MIN_THRESHOLD,
  MED_THRESHOLD,
  MIN_INCREMENT,
  MAX_INCREMENT
} = require("../config/constants")

const actions = {
  "feed": {
    "hunger": R.add(MIN_INCREMENT)
  },
  "putToBed": {
    "energy": R.add(MIN_INCREMENT)
  },
  "sleep": {
    "energy": R.add(MIN_INCREMENT)
  },
  "pet": {
    "happiness": R.add(MIN_INCREMENT)
  },
  "poop": {
    "bowel": R.add(MIN_INCREMENT)
  },
  "age": {
    "birthDate": R.add(MIN_INCREMENT)
  },

};

const nonUserActions = ['poop', 'age', 'sleep'];

console.log(R.sortBy(R.props, actions))

const invoke = stats => action =>
  R.evolve(actions[action])(stats);

const omitKeysAndSort = omitKeys => R.compose(
  R.sort(alphabeticCompare),
  R.without(nonUserActions),
  R.keys
);

const alphabeticCompare = (a, b) => R.toLower(a).localeCompare(R.toLower(b));

const omitNonUserActions = omitKeysAndSort(nonUserActions);

const actionList = omitNonUserActions(actions);

module.exports = {
  invoke,
  actionList
}