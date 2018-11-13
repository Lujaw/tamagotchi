// const prompt = require('async-prompt');
const R = require('ramda');
const Re = require('ramda-extension');
const { prompt } = require('enquirer');


const promptAction = (options) => async (name)  =>
  await prompt([{
    type: 'select',
    name: 'action',
    message: `What do you want to do with ${name}?`,
    initial: 1,
    choices: options.map(Re.toUpperFirst),
    result: (value) => value ? R.toLower(value) : []
    }
  ]);

const promptText = async (text) =>
  await prompt([{
    type: 'input',
    name: 'name',
    message: text,
    result: (value) => value ? Re.toUpperFirst(value) : []
}]);

module.exports = {
  promptAction,
  promptText,
}

