const R = require('ramda');
const { tamagotchi } = require('../tamagotchi/index');
const actionsFixtures = require('./fixtures/action.json');

describe('Tamagotchi', () => {
  let pet;

  beforeEach(() => {
    pet = tamagotchi('testPet');
  });

  it('should initialize with the given name and stage as new Born', () => {
    const state = pet.getState();
    expect(pet.getName()).toBe('testPet');
    expect(pet.getAge()).toBe(0);
    expect(state).toHaveProperty("health");
    expect(state).toHaveProperty("stage", "New born");
    expect(state).toHaveProperty("happiness");
    expect(state).toHaveProperty("bowel");
    expect(state).toHaveProperty("energy");
    expect(state).toHaveProperty("hunger");
  });

  it('should be able to be renamed', () => {
    expect(pet.getName()).toBe('testPet');
    pet.setName('newName')
    expect(pet.getName()).toBe('newName');
  });


  it('should start the state loop for the tamagotchi', done => {
    const initialState = pet.getState();
    pet.startLoop(1);
    setTimeout(function () {
      const newstate = pet.getState();
      expect(newstate).not.toEqual(initialState);
      expect(pet.getState()).toHaveProperty("health", 0);
      expect(pet.getState()).toHaveProperty("happiness", 0);
      expect(pet.getState()).toHaveProperty("bowel", 100);
      expect(pet.getState()).toHaveProperty("energy", 0);
      expect(pet.getState()).toHaveProperty("hunger", 0);
      done()
    }, 100)
  });



  describe('tamagotchi actions: ', () => {
    const actionStates = R.toPairs(actionsFixtures.actions);
    describe.each(actionStates)
    ('.add(`tests`)',
      (a, expected) => {
        test(`${a} changes state to ${JSON.stringify(expected)}`, () => {
          pet.setState(actionsFixtures.initialState);
          pet.act(a);
          expect(pet.getState()).toEqual(expected);
        });
      });
  });
});