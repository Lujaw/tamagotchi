const R = require('ramda');
const Re = require('ramda-extension');

const { MAX_VALUE, MIN_VALUE } = require('../config/constants')
const {
  assignOrRandom,
  generateRandom,
  incWithinThreshold,
  decWithinThreshold,
  getStateProgress,
  sanitizeState
} = require("../utils/helpers");

const decreasingStates = ['hunger','happiness','energy','health'];
const increasingStates = ['bowel'];
const combinedStates = R.concat(decreasingStates, increasingStates);

const getState = ({
  health,
  energy,
  hunger,
  bowel,
  happiness
} = {}) => ({
  health: assignOrRandom(health),
  energy: assignOrRandom(energy),
  hunger: assignOrRandom(hunger),
  happiness: assignOrRandom(happiness),
  bowel: bowel || generateRandom(MAX_VALUE, MIN_VALUE)
});

const updateState = (state, currenState) => ({
  ...currenState,
  ...state
})

const showStates = (state) => {
  const currentState = JSON.stringify(getStateProgress(state))
  console.log( sanitizeState(currentState))
}
const stateLoopTransformer = () => {
  const stateOperation = (state) =>
    R.contains(state, decreasingStates) ?
      { [state]: decWithinThreshold } :
      { [state]: incWithinThreshold };

  return R.mergeAll(R.zipWith(stateOperation, combinedStates, Array(combinedStates.length)));
}

module.exports = {
  getState,
  updateState,
  showStates,
  stateLoopTransformer
}