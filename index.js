const axios = require('axios')

module.exports = class {

  constructor () {
    this.token = null
    axios.post('http://localhost:8080/light/yellow/only')
  }

  apply (jestHooks) {
    jestHooks.onTestRunComplete((results) => {
      if (!results.success) {
        return axios.post('http://localhost:8080/light/red/only')
      }

      return axios.post('http://localhost:8080/light/green/only')
    })

    jestHooks.onFileChange(() => {
      axios.post('http://localhost:8080/light/yellow/only')
    })
  }
}
