// const prompt = require('async-prompt');
const R = require('ramda');
const Re = require('ramda-extension');
const colors = require('ansi-colors');
const { prompt } = require('enquirer');

const { convertToStringWithProgressBar } = require('./helpers');

const promptAction = options => async (state, name = 'Tamagotchi') => {
  console.clear();
  return await prompt([{
    type: 'select',
    name: 'action',
    header: `Stats -> ${convertToStringWithProgressBar(state)}`,
    footer: colors.blue('(Press up and down to select action)'),
    message: `What do you want to do with ${name}?`,
    choices: options.map(Re.toUpperFirst),
    result: value => (value ? R.toLower(value) : [])
  }]);
};

const promptText = async (text) => {
  console.clear();
  return await prompt([{
    type: 'input',
    name: 'name',
    message: text,
    result: value => (value ? Re.toUpperFirst(value) : [])
  }]);
};

module.exports = {
  promptAction,
  promptText
};
