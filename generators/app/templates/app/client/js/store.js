import { combineReducers, createStore } from 'redux';

import * as reducers from './reducers';

export default function() {
  let store = createStore(
    combineReducers(reducers),
    {},
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(
      combineReducers(require('./reducers'))
    ));
  }

  return store;
}
