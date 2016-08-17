import { combineReducers, createStore } from 'redux';

import * as reducers from './redux/reducers';

export default createStore(
  combineReducers(reducers),
  {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
);
