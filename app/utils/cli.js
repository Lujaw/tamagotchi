const prompt = require('async-prompt');
const R = require('ramda');
const Re = require('ramda-extension');


const { actionList } = require("../tamagotchi/actions");

const mapIndexed = R.addIndex(R.map);

const indexedList = mapIndexed((val, idx) => `${idx + 1}-> ${Re.toPascalCase(val)}`);

const indexedActionList = indexedList(actionList).join('\n');


const promptUser = async () => {
  console.log(`What would you like to do? \n${indexedActionList}` );
  return await prompt(`Enter number [1-${actionList.length}]: `);
}


const getUserAction = index => index;

(async () => {
  try {
    let input = await promptUser();
    console.log( input)
    while(input <= actionList.length ){
      input = await promptUser();
    }
    console.log('Thank you')
    process.exit();



  } catch (e) {
    console.log('cli.js#29 --->', e)
  }
})()