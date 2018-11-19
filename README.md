# Tamagotchi
A virtual cli pet created in node

Commands:

* npm run lint -> run the lints
* npm test -> run the tests
* npm start -> run the app in dev mode
* npm run serve -> run the app in prod mode


File Structure:
```
|-- app
|   |-- config
|   |   |-- constants.js        (All the constants defined here)
|   |   `-- messages.js         (The message to be shown)
|   |-- tamagotchi
|   |   |-- actions.js          (The actions for the pet and their calculation fns)
|   |   |-- index.js            (Factory function for the tamagotchi object)
|   |   `-- state.js            (The state calculations for the tamagotchi)
|   |-- test
|   |   |-- fixtures
|   |   |   `-- action.json
|   |   `-- tamagotchi.test.js
|   |-- utils
|   |   |-- cli.js              (Fns related to the display in the CLI)
|   |   `-- helpers.js          (All the utility fns defined here)
|   `-- index.js                (The entry point)
|-- LICENSE
|-- README.md
|-- package-lock.json
`-- package.json
```


### Instructions:

1. Name the tamagotchi
2. Select the action by pressing up/down and then pressing enter
3. Each action will change the tamagotchi state
4. Green color bar means All Ok, Red means the state is critical
5. Select the action that increases the critical state
6. Repeat



#### Actions:
##### Primary reaction
* Feed -> Increases Fullness
* Give Medicine -> Increases Health
* Go Potty -> Increases Bowel
* Play -> Increases Happiness
* Put To Bed -> Increases Energy

Secondary reactions may increase/decrease other states


#### Automatic Actions:
* When the energy is below the lower_threshold, the pet will go to sleep.
* When the bowel is below the lower_threshold, the pet will poop



#### Game over scenarios:
* When the health is zero
* When the age reaches maximum age
* The user selects to quit


#### Roadmap:

* Read/write state to external file, so that quitting doesn't start over
* Add option to pause the game
* Adding ASCII image of the current state of the pet
* Using pkg to create executable package

