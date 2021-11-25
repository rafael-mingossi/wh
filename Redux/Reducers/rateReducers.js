import {
  ADD_RATE_REQUEST,
  ADD_RATE_FAIL,
  ADD_RATE_SUCCESS,
  GET_RATE_REQUEST,
  GET_RATE_SUCCESS,
  GET_RATE_FAIL,
  DELETE_RATE_REQUEST,
  DELETE_RATE_SUCCESS,
  DELETE_RATE_FAIL,
} from '../constants';

export const getRateReducers = (state = { rates: [] }, action) => {
  switch (action.type) {
    case GET_RATE_REQUEST:
      return { loading: true };
    case GET_RATE_SUCCESS:
      return { loading: false, rates: action.payload };
    case GET_RATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addRateReducers = (state = {}, action) => {
  switch (action.type) {
    case ADD_RATE_REQUEST:
      return { loading: true };
    case ADD_RATE_SUCCESS:
      return { loading: false, success: true };
    case ADD_RATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const deleteRateReducers = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RATE_REQUEST:
      return { loading: true };
    case DELETE_RATE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_RATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
