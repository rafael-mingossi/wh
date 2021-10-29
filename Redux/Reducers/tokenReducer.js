import { GET_TOKEN } from '../Actions/tokenActions';

const initialState = {
  tokens: '',
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, tokens: action.payload };
    default:
      return state;
  }
};
