const api = require('./lib/api.js');

module.exports = class JestLightsReporter {
  onRunStart(_results, _options) {
    return api.yellow({ alert: 'lselect' });
  }

  onRunComplete(_contexts, results) {
    return (
      results.numFailedTests === 0
        ? api.green()
        : api.red()
    )
      .then(() => api.off({ delay: 60000, alert: "none" }));
  }
}
