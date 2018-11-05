const R = require('ramda');

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
  "putToBed": {
    "energy": R.add(MIN_INCREMENT)
  }
};

const invoke = stats => action =>
  R.evolve(actions[action])(stats);

module.exports = {
  invoke
}