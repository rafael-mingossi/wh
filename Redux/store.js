import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { rateReducers } from './Reducers/rateReducers';
import { addDayReducers } from './Reducers/addDayReducer';

export const reducers = combineReducers({
  rateR: rateReducers,
  inputR: addDayReducers,
});

const store = createStore(reducers);

export default store;
