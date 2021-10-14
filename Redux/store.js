import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { rateReducers } from './Reducers/rateReducers';
import { addDayReducers } from './Reducers/addDayReducer';
import { invoicesReducers } from './Reducers/invoicesReducer';

export const reducers = combineReducers({
  rateR: rateReducers,
  inputR: addDayReducers,
  invoicesR: invoicesReducers,
});

const store = createStore(reducers);

export default store;
