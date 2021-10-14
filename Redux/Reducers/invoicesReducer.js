const initialState = {
  data: [],
};

export const invoicesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INVOICE':
      return action.payload;
    case 'ADD_INVOICE':
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
