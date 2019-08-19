const api = require('./lib/api.js');

const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

module.exports = class JestLightsReporter {
  onRunStart(_results, _options) {
    return api.yellow();
  }

  onRunComplete(_contexts, results) {
    const resultLight = results.success
      ? api.green()
      : api.red();

    return resultLight
      .then(() => delay(5000))
      .then(() => api.off());
  }
}
