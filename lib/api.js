const process = require('process');
const axios = require('axios');

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

const makeRequest = (url) => {
  if (hasApiFailed) {
    warnOnce();
    return () => Promise.resolve();
  }

  return () => axios.post(`http://${url}`)
    .catch((err) => {
      const status = err.response && err.response.status;
      switch (status) {
        case 401:
          console.log('Not authorized to use traffic light server');
          return;
      }
      hasApiFailed = true;
      console.log(`[Jest-Light] An unknown error occured while hitting ${url}: ${err.message}`);
    })
}

const sessionCreate = () => axios.get(`${host}/session`);
const sessionDestroy = () => axios.delete(`${host}/session`);

const green = makeRequest(`${host}/light/green/only`);
const yellow = makeRequest(`${host}/light/yellow/only`);
const red = makeRequest(`${host}/light/red/only`);
const off = makeRequest(`${host}/light/off`);

module.exports = {
  sessionCreate,
  sessionDestroy,

  green,
  yellow,
  red,

  off,
};
