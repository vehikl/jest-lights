const api = require('./lib/api.js');

module.exports = class JestLightsReporter {
  onRunStart(_results, _options) {
    return api.yellow();
  }

  onRunComplete(_contexts, results) {
    return (
      results.numFailedTests === 0
        ? api.green()
        : api.red()
    )
      .then(() => api.off({ delay: 5000 }));
  }
}
