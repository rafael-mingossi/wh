import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { rateReducers } from './Reducers/rateReducers';
import { addDayReducers } from './Reducers/addDayReducer';
import { invoicesReducers } from './Reducers/invoicesReducer';
import { tokenReducer } from './Reducers/tokenReducer';

export const reducers = combineReducers({
  rateR: rateReducers,
  inputR: addDayReducers,
  invoicesR: invoicesReducers,
  tokenR: tokenReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
