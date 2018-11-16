const R = require('ramda');

const messageTable = {
  LOW_HEALTH: 'is feeling ill, and needs some medication.',
  LOW_ENERGY: 'has run out of energy, so has slept for a while.',
  HIGH_BOWEL: "couldn't hold it and has pooped on the carpet."
};

const getMessage = name => context => `${name} ${messageTable[R.toUpper(context)]} \n`;

module.exports = { getMessage };
