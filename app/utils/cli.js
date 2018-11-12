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


// const promptUser = (options, maxNumber) => async (name)  => {
//   console.log(`What would you like ${Re.toUpperFirst(name)} to do? \n${options}` );
//   return await prompt(`Enter number [1-${maxNumber}]: `);
// }

const promptText = async (text) =>
  await prompt([{
    type: 'input',
    name: 'name',
    message: text
}]);

module.exports = {
  promptAction,
  promptText,
}

