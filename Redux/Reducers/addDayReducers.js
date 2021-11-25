import {
  GET_DAY_REQUEST,
  GET_DAY_SUCCESS,
  GET_DAY_FAIL,
  ADD_DAY_REQUEST,
  ADD_DAY_SUCCESS,
  ADD_DAY_FAIL,
  DELETE_DAY_REQUEST,
  DELETE_DAY_SUCCESS,
  DELETE_DAY_FAIL,
} from '../constants';

export const getDayReducers = (state = { inputs: [] }, action) => {
  switch (action.type) {
    case GET_DAY_REQUEST:
      return { loading: true };
    case GET_DAY_SUCCESS:
      return { loading: false, inputs: action.payload };
    case GET_DAY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addDayReducers = (state = {}, action) => {
  switch (action.type) {
    case ADD_DAY_REQUEST:
      return { loading: true };
    case ADD_DAY_SUCCESS:
      return { loading: false, success: true };
    case ADD_DAY_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const deleteDayReducers = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DAY_REQUEST:
      return { loading: true };
    case DELETE_DAY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_DAY_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
