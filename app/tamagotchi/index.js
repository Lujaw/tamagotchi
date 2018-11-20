const R = require('ramda');
const Re = require('ramda-extension');

const {
  initState,
  updateState,
  stateLoopTransformer
} = require('./state');

const {
  TIME_STEP,
  LOWER_THRESHOLD,
  MAX_AGE,
  DEFAULT_NAME
} = require('../config/constants');
const { getMessage } = require('../config/messages');
const {
  invoke,
  die,
  isUserAction
} = require('./actions');
const { isEnv } = require('../utils/helpers');
const { setTopMessage } = require('../utils/cli');

/**
 * Takes the age and then coverts it to corresponding stage
 * @param  {number} age
 */
const convertAgeToStage = R.cond([
  [R.lte(MAX_AGE), R.always('Dead')],
  [R.lte(0.65 * MAX_AGE), R.always('Elderly')],
  [R.lte(0.20 * MAX_AGE), R.always('Adult')],
  [R.lte(0.10 * MAX_AGE), R.always('Teen')],
  [R.lte(0.01 * MAX_AGE), R.always('Infant')],
  [R.T, R.always('New born')]
]);

const stateTransformer = stateLoopTransformer();

/**
 * Converts given dateString to age by dividing the seconds from
 * birthday to proportion to the TIME_STEP
 * @param  {dateString} birthDate
 */
const birthdayToAge = birthDate => Math.floor(
  (new Date().getTime() - new Date(birthDate).getTime()) / TIME_STEP
);

/**
 * Point-free function which takes dateString as input and then
 * return the corresponding lifeStage
 * @param  {dateString}
 */
const getLifeStage = R.compose(
  convertAgeToStage,
  birthdayToAge,
);
/**
 * Create Tamagotchi object with given name and additional methods
 * @param  {} initialName=DEFAULT_NAME
 */
const tamagotchi = (initialName = DEFAULT_NAME) => {
  const birthDate = new Date();
  let name = Re.toUpperFirst(initialName);
  let state = initState();
  const getMessageWithName = getMessage(name);


  /**
   * Apply the given action and then update the current state with the
   * computed states
   * @param  {String} action
   */
  const act = (action) => {
    state = invoke(state)(action);
  };

  const getAge = () => birthdayToAge(birthDate);

  const getState = () => state;

  /** Changes the state to the provided state values
   * @param  {object} newState
   */
  const setState = (newState) => {
    state = updateState(newState, state);
  };

  /**
   * @param  {object} state
   * Takes the destructured values from the state to check it against
   * the threshold values and apply corresponding non-user initiated actions
   */
  const checkState = ({
    energy,
    bowel,
    health
  }) => {
    if (getAge() >= MAX_AGE) {
      die(name, 'old age');
    }
    if (health <= 0) {
      die(name, 'your negligence');
    }
    if (health <= LOWER_THRESHOLD) {
      setTopMessage(getMessageWithName('LOW_HEALTH'));
      act('sleep');
    }
    if (energy <= LOWER_THRESHOLD) {
      setTopMessage(getMessageWithName('LOW_ENERGY'));
      act('sleep');
    }
    if (bowel <= LOWER_THRESHOLD) {
      setTopMessage(getMessageWithName('LOW_BOWEL'));
      act('poop');
    }
  };
  const getName = () => name;
  const setName = (newName) => {
    name = newName;
  };

  /**
   * @param  {integer} step = TIME_STEP
   * starts a loop with given step as intervals
   * which updates the states by applying the transformer function to
   * the current state and adds the derived stage
   */
  const startLoop = (step = TIME_STEP) => setInterval(() => {
    state = {
      ...(R.evolve(stateTransformer, state)),
      stage: getLifeStage(birthDate)
    };
    // checkState is is disabled for testing as it makes states unpredictable
    if (!isEnv('test')) {
      checkState(state);
    }
  }, step);

  return {
    act,
    getAge,
    getLifeStage,
    getName,
    setName,
    getState,
    setState,
    startLoop
  };
};


module.exports = { tamagotchi };
