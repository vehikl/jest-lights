# Jest Lights

A jest reporter that turns on and off traffic lights based on test results

## Install

```bash
npm install --save-dev @vehikl/jest-lights
# OR
yarn add --dev @vehikl/jest-lights
```

## Configure Jest

You'll need to add this reporter to your jest configuration, which may be in `package.json#jest`, or more recent versions are in `jest.config.js`.

If you have your jest config in `package.json`:

```json
{
  // ...
  "jest": {
    // ...
    "reporters": [
      "default",
      "...other-reporters?",
      "@vehikl/jest-lights"
    ]
  }
}
```

And `jest.config.js`:

```js
module.exports = {
  reporters: [
    "default",
    "...other-reporters?",
    "@vehikl/jest-lights"
  ]
}
```

## Run Tests

You'll need to set the `LIGHTS_API_HOST` environment variable.
By default, it points to `localhost:8080`, but this will likely be wrong.
If not configured, or configured incorrectly, you will see a warning message with appropriate instructions.

For best results, set the environment variable in your `package.json#scripts#test` script:

```json
{
  "scripts": {
    // ...
    "test": "LIGHTS_API_HOST=192.168.0.xxx:8080 jest"
  }
}
```

If all goes to plan, the traffic lights will change as you run your tests.
