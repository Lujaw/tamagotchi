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

const decreasingStates = ['happiness', 'energy', 'health', 'fullness'];
const increasingStates = ['bowel'];

// unnest is being used, inorder to accomodate more than two types of states
const combinedStates = unnestAll(decreasingStates, increasingStates);

/**
 * Initialize the state with the value provided or assign a random number
 * @param  {object} state
 */
const initState = ({
  health,
  energy,
  fullness,
  bowel,
  happiness,
  stage
} = {}) => ({
  health: assignOrRandom(health),
  energy: assignOrRandom(energy),
  fullness: assignOrRandom(fullness),
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

/**
 * Takes state, and then log the state if the environment is not test
 * @param  {object} state
 */
const showStates = state => !isEnv('test') && console.log(convertToStringWithProgressBar(state));

/**
 * Takes the names of the state variable and returns whether it is an
 * increasing or a decreasing one
 * @param  {string}
 */
const getStateType = R.cond([
  [R.contains(R.__, decreasingStates), R.always('dec')],
  [R.contains(R.__, increasingStates), R.always('inc')],
  [R.T, R.identity]
]);

/**
 * Returns the state transformer object for the states which
 * is applied in the loop
 */
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
  getStateType,
  stateLoopTransformer
};
