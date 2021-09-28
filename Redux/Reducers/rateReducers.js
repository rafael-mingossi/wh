import { ADD_RATE, REMOVE_RATE, GET_RATE } from '../constants';

const initialState = [];

export const rateReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATE:
      return { ...state, rates: action.payload };
    case 'ADD_RATE':
      return action.payload;
    case REMOVE_RATE:
      return {
        ...state,
        rates: state.rates.filter((rate) => rate.id !== action.payload.id),
      };
    default:
      return state;
  }
};
