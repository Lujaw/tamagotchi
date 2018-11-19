// const prompt = require('async-prompt');
const R = require('ramda');
const Re = require('ramda-extension');
const colors = require('ansi-colors');
const { prompt } = require('enquirer');

const { addAnsiStyle, convertToStringWithProgressBar } = require('./helpers');

let topMessage = '';

const setTopMessage = (message) => {
  topMessage = message;
};

const showTopMessage = () => {
  console.log(addAnsiStyle(topMessage, 'red'));
  topMessage = '';
};

/**
 * Promt the user to choose an action from given choices
 * @param  {Array} choices
 * @param  {Object} state
 * @param  {String} name='Tamagotchi'
 * Curried async function which takes list of available actions
 * and then current state and the pet name
 * returns a prompts user to select from given choices
 */
const promptAction = choices => async (state, name = 'Tamagotchi') => {
  console.clear();
  showTopMessage();
  return await prompt([{
    type: 'select',
    name: 'action',
    header: `Stats ->  ${convertToStringWithProgressBar(state)}`,
    footer: colors.blue('(Press up and down to select action)'),
    message: `What do you want to do with ${name}?`,
    choices: choices.map(Re.toUpperFirst),
    result: value => (value ? R.toLower(value) : [])
  }]);
};
/**
 * Prompts user for input using the provided message as the question
 * @param  {string} message
 */
const promptText = async (message) => {
  console.clear();
  return await prompt([{
    type: 'input',
    name: 'name',
    result: value => (value ? Re.toUpperFirst(value) : []),
    message
  }]);
};

module.exports = {
  promptAction,
  promptText,
  setTopMessage
};
