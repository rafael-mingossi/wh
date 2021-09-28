import { ADD_DAY, REMOVE_DAY, GET_DAY } from '../constants';

const initialState = [];

export const addDayReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DAY:
      return { ...state, rates: action.payload };
    case 'ADD_DAY':
      return action.payload;
    case REMOVE_DAY:
      return {
        ...state,
        inputs: state.rates.filter((inputs) => inputs.id !== action.payload.id),
      };
    default:
      return state;
  }
};
