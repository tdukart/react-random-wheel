## react-random-wheel
Randomization wheel for React. Displays a series of segments and, on command, cycles through them to select one at
random.

### Usage
Install using npm or yarn.

#### Properties
* `segments`: Required. An array of objects in this format:
    * `name`: Required. The name to display.
    * `color`: Optional. One of `'red'`, `'blue'`, or `'green'`. Defaults to `'red'` for odd-numbered segments or
      `'blue'` for even-numbered segments.
    * `data`: Optional. An object that will be passed back untouched when the segment is selected.
* `spinTime`: Optional. The number of milliseconds that a spin will last. Defaults to 2500.
* `onComplete`: Optional. A callback that will receive the segment's object when the spinning animation is complete.

### Methods

#### spinWheel()
Spins the wheel to select a random segment. Returns the segment that will be highlighted in the end. It's recommended
that you wait until `onComplete` is called before doing anything user-facing with the selected segment, since the
selection won't be obvious until then.

### Example
See [demo/wheel.js](demo/wheel.js)

## License
(c) 2017 Todd Dukart. MIT licensed. See LICENSE for more information.
