import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import axios from 'axios'


const initialState = {
  flybys: ''
}



function apiReducer(state=initialState, action) {
  const callApi = function(action) {
    return axios.get(
      "http://api.open-notify.org/iss-pass.json?lat=" +
      action.values.latitude.toString() +
      "&lon=" +
      action.values.longitude.toString() +
      "&n=" +
      action.values.number.toString()
    )
    .then(response => {
      return [{duration: 22, risetime: 22222222}]
    })
    .catch(error => {
      return [{}]
    })
  };

  switch(action.type) {
    case 'QUERY':
      const output = callApi(action).then(response => {
          return [{duration: 22, risetime: 22222222}]
        })
      console.log('output')
      console.log(output);
      return {
        flybys: [{duration: 22, risetime: 22222222}]
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer,
  api: apiReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
