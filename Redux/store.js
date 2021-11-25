import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import {
  getRateReducers,
  addRateReducers,
  deleteRateReducers,
} from './Reducers/rateReducers';
import {
  invoicesReducers,
  deleteInvoicesReducer,
  invoiceItemsReducer,
  invoiceAmountReducer,
  invoiceNumberReducer,
} from './Reducers/invoicesReducer';
import { tokenReducer } from './Reducers/tokenReducer';
import { userLoginReducer } from './Reducers/userLoginReducer';
import { userRegisterReducer } from './Reducers/userRegisterReducer';
import {
  getDayReducers,
  deleteDayReducers,
  addDayReducers,
} from './Reducers/addDayReducers';

export const reducers = combineReducers({
  rateR: getRateReducers,
  addRateR: addRateReducers,
  deleteRateR: deleteRateReducers,
  invoicesR: invoicesReducers,
  deleteInvoicesR: deleteInvoicesReducer,
  invoiceItemsR: invoiceItemsReducer,
  invoiceAmountR: invoiceAmountReducer,
  invoiceNumberR: invoiceNumberReducer,
  tokenR: tokenReducer,
  userLR: userLoginReducer,
  userRR: userRegisterReducer,
  dayR: getDayReducers,
  addDayR: addDayReducers,
  deleteDayR: deleteDayReducers,
});

const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
