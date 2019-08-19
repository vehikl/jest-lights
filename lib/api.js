const process = require('process');
const axios = require('axios');
const colorette = require('colorette');

const host = process.env.LIGHTS_API_HOST || 'localhost:8080';

let hasApiFailed = false;
let hasBeenWarned = false;

const warnOnce = () => {
  if (hasBeenWarned) {
    return;
  }
  hasBeenWarned = true;
  console.log('[Jest Lights] The `LIGHTS_API_HOST` environment variable must be specified');
}

const makeRequest = (url, fallback = '') => {
  const showFallback = () => fallback && console.log(fallback);

  return (params) => {
    if (hasApiFailed) {
      warnOnce();
      showFallback();
      return () => Promise.resolve();
    }

    return axios.post(`http://${url}`, {}, { params })
      .catch((err) => {
        const status = err.response && err.response.status;
        switch (status) {
          case 401:
            console.log('Not authorized to use traffic light server');
            return;
        }
        if (!hasApiFailed) {
          hasApiFailed = true;
          console.log(`[Jest-Light] An unknown error occured while hitting ${url}: ${err.message}`, { status });
        }
        showFallback();
      })
  }
}

const sessionCreate = () => axios.get(`${host}/session`);
const sessionDestroy = () => axios.delete(`${host}/session`);

const green = makeRequest(`${host}/light/green/only`, colorette.green('🚦 Tests are passing'));
const yellow = makeRequest(`${host}/light/yellow/only`, colorette.yellow('🚦 Tests are running'));
const red = makeRequest(`${host}/light/red/only`, colorette.red('🚦 Tests are failing'));
const off = makeRequest(`${host}/light/off`, '🚦 Tests are complete, shutting down');

module.exports = {
  sessionCreate,
  sessionDestroy,

  green,
  yellow,
  red,

  off,
};
