const prompt = require('async-prompt');
const R = require('ramda');

const promptUser = (promptText, maxNumber) => async (_)  => {
  console.log(`What would you like to do? \n${promptText}` );
  return await prompt(`Enter number [1-${maxNumber}]: `);
}

module.exports = {
  promptUser
}