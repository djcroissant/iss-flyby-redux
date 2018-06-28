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
  flybys: [{}]
}

function apiReducer(state=initialState, action) {
  switch(action.type) {
    case 'QUERY':
    let flybys
    axios.get(
      "http://api.open-notify.org/iss-pass.json?lat=" +
      action.values.latitude.toString() +
      "&lon=" +
      action.values.longitude.toString() +
      "&n=" +
      action.values.number.toString()
      )
      .then(response => {
        flybys = response.data.response;
      });
      return {
        flybys: flybys
      };
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
