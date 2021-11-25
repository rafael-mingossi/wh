import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../Actions/rateActions';

//nos 26:00 do video
export const userRegisterHandler =
  (firstName, email, password, lastName, isAdmin) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
    } catch (err) {
      //component can be added here to better output the error to the user
      dispatch({ type: USER_REGISTER_FAIL, payload: err });
    }
  };
