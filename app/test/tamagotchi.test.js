const R = require('ramda');
const { tamagotchi } = require('../tamagotchi/index');
const actionsFixtures = require('./fixtures/action.json');

describe('Tamagotchi', () => {
  let pet;

  beforeEach(() => {
    pet = tamagotchi('TestPet');
  });

  it('should initialize with the given name and stage as new Born', () => {
    const state = pet.getState();
    expect(pet.getName()).toBe('TestPet');
    expect(pet.getAge()).toBe(0);
    expect(state).toHaveProperty('health');
    expect(state).toHaveProperty('stage', 'New born');
    expect(state).toHaveProperty('happiness');
    expect(state).toHaveProperty('bowel');
    expect(state).toHaveProperty('energy');
    expect(state).toHaveProperty('fullness');
  });

  it('can be renamed', () => {
    expect(pet.getName()).toBe('TestPet');
    pet.setName('newName');
    expect(pet.getName()).toBe('newName');
  });


  it('should start the state loop for the tamagotchi', (done) => {
    const initialState = pet.getState();
    pet.startLoop(1);
    setTimeout(() => {
      const newState = pet.getState();
      expect(newState).not.toEqual(initialState);
      expect(newState).toHaveProperty('health', 0);
      expect(newState).toHaveProperty('happiness', 0);
      expect(newState).toHaveProperty('fullness', 0);
      done();
    }, 100);
  });


  describe('tamagotchi', () => {
    const actionStates = R.toPairs(actionsFixtures.actions);
    describe.each(actionStates)('',
      (a, expected) => {
        test(`${a} changes state to ${JSON.stringify(expected)}`, () => {
          pet.setState(actionsFixtures.initialState);
          pet.act(a);
          expect(pet.getState()).toEqual(expected);
        });
      });
  });
});
