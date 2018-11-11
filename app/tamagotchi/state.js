const R = require('ramda');

const {
  assignOrRandom,
  generateRandom,
  incWithinThreshold,
  decWithinThreshold
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
  bowel: bowel || generateRandom(10, 0)
});

const updateState = (state, currenState) => ({
  ...currenState,
  ...state
})

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
  stateLoopTransformer
}