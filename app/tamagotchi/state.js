const {
  assignOrRandom,
  generateRandom
} = require("../utils/helpers");

const getState = ({
  health,
  energy,
  hunger,
  bowel
} = {}) => ({
  health: assignOrRandom(health),
  energy: assignOrRandom(energy),
  hunger: assignOrRandom(hunger),
  bowel: bowel || generateRandom(10, 0)
});

const updateState = (state, currenState) => ({
  ...currenState,
  ...state
})

module.exports = {
  getState,
  updateState
}