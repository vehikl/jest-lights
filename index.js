const axios = require('axios');

module.exports = class {

  constructor() {
    this.token = null;
  }
  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    jestHooks.onTestRunComplete((results) => {
      if (results.numFailedTests > 0) {
        console.log('failed')
        return axios.post('http://localhost:8080/light/red/only');
      }
      console.log('pass')
      return axios.post('http://localhost:8080/light/green/only');
    });

    jestHooks.shouldRunTestSuite(() => {
      return axios.post('http://localhost:8080/light/yellow/only').then(() => true);
    });
  }
}