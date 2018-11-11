const prompt = require('async-prompt');
const R = require('ramda');
const Re = require('ramda-extension');
const promptUser = (options, maxNumber) => async (name)  => {
  console.log(`What would you like ${Re.toUpperFirst(name)} to do? \n${options}` );
  return await prompt(`Enter number [1-${maxNumber}]: `);
}

const promptText = async (text) => {
  return await prompt(text);

}


module.exports = {
  promptUser,
  promptText
}