const R = require('ramda');
const { tamagotchi } = require('./tamagotchi/index');
const { actionList } = require('./tamagotchi/actions');
const { TIME_STEP, DEFAULT_NAME } = require('./config/constants');
const { promptText, promptAction } = require('./utils/cli');
const { exitWithMessage, isEnv } = require('./utils/helpers');

const getInput = promptAction(actionList);

const isPermittedAction = action => R.contains(action, actionList);

const step = TIME_STEP;

/**
 * Async IIFE which instantiates a new pet with user given name
 * and asks for user input until the user quits or the pet is dead
 */
(async () => {
  try {
    const { name } = await promptText('Choose a name for your tamagotchi?\n');
    const myPet = tamagotchi(name || DEFAULT_NAME);
    myPet.startLoop(step);
    let { action } = await getInput(myPet.getState(), name);
    while (isPermittedAction(action)) {
      myPet.act(action);
      action = (await getInput(myPet.getState(), name)).action;
    }
    exitWithMessage(`Thank you for playing with ${name}.`);
  } catch (e) {
    console.log('Sorry, an error occured');
    if (!isEnv('prod')) {
      console.error(`error ---> ${e}`);
    }
  }
})();
