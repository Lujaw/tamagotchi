const R = require('ramda');

const { MAX_VALUE, MIN_VALUE } = require('../config/constants');
const {
  assignOrRandom,
  convertToStringWithProgressBar,
  decWithinThreshold,
  generateRandom,
  incWithinThreshold,
  isEnv,
  unnestAll
} = require('../utils/helpers');

const decreasingStates = ['hunger', 'happiness', 'energy', 'health'];
const increasingStates = ['bowel'];
const combinedStates = unnestAll(decreasingStates, increasingStates);

/**
 * Initialize the state with the value provided or assign a random number
 * @param  {object} state
 */
const initState = ({
  health,
  energy,
  hunger,
  bowel,
  happiness,
  stage
} = {}) => ({
  health: assignOrRandom(health),
  energy: assignOrRandom(energy),
  hunger: assignOrRandom(hunger),
  happiness: assignOrRandom(happiness),
  bowel: bowel || generateRandom(MAX_VALUE, MIN_VALUE),
  stage: stage || 'New born'
});

/**
 * Takes currentState, newState and return a updated state
 * @param  {object} state
 * @param  {object} currentState
 */
const updateState = (newState, currentState) => ({
  ...currentState,
  ...newState
});

const showStates = state => !isEnv('test') && console.log(convertToStringWithProgressBar(state));

const stateLoopTransformer = () => {
  const stateOperation = R.cond([
    [R.contains(R.__, decreasingStates), R.assoc(R.__, decWithinThreshold, {})],
    [R.contains(R.__, increasingStates), R.assoc(R.__, incWithinThreshold, {})],
    [R.T, R.identity]
  ]);

  return R.mergeAll(
    R.zipWith(
      stateOperation,
      combinedStates,
      Array(combinedStates.length),
    ),
  );
};

module.exports = {
  initState,
  updateState,
  showStates,
  stateLoopTransformer
};
