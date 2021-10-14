import { ADD_RATE, REMOVE_RATE, GET_RATE } from '../constants';

const initialState = [];

export const rateReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RATE':
      return action.payload;

    default:
      return state;
  }
};
