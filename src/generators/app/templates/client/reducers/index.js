import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import and combine your reducers
export default combineReducers({
  routing: routerReducer
});
