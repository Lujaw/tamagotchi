const R = require('ramda');
const Re = require('ramda-extension');

const { MAX_VALUE, MIN_VALUE } = require('../config/constants')
const {
  assignOrRandom,
  unnestAll,
  generateRandom,
  incWithinThreshold,
  decWithinThreshold,
  convertToStringWithProgressBar
} = require("../utils/helpers");

const decreasingStates = ['hunger','happiness','energy','health'];
const increasingStates = ['bowel'];
const combinedStates = unnestAll(decreasingStates, increasingStates);

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
  stage: 'New born'
});

const updateState = (state, currenState) => ({
  ...currenState,
  ...state
})

const showStates = (state) => console.log(convertToStringWithProgressBar(state))

const stateLoopTransformer = () => {
  const stateOperation = R.cond([
    [R.contains(R.__, decreasingStates), R.assoc(R.__,decWithinThreshold,{}) ],
    [R.contains(R.__, increasingStates), R.assoc(R.__,incWithinThreshold,{}) ],
    [R.T, R.identity]
  ])

  return R.mergeAll(
    R.zipWith(
      stateOperation,
      combinedStates,
      Array(combinedStates.length))
   );
}

module.exports = {
  initState,
  updateState,
  showStates,
  stateLoopTransformer
}