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

import baseURL from '../../assets/baseURL';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getRatesHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_RATE_REQUEST });

    await axios
      .get(`${baseURL}rates/${userId}`)
      .then((res) => {
        dispatch({
          type: GET_RATE_SUCCESS,
          payload: res.data,
        });
      })

      .catch((error) => console.log(`Error loading rates: ${error}`));
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: GET_RATE_FAIL, payload: error });
  }
};

export const addRateHandler = (day, value, user, token) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RATE_REQUEST });

    const validToken = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(`${baseURL}rates`, { day, value, user }, validToken)
      .then((res) => [
        dispatch({ type: ADD_RATE_SUCCESS, payload: res.data }),
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Rate added',
          text2: '',
        }),
      ])
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: ADD_RATE_FAIL, payload: error });
  }
};

export const deleteRateHanler = (id, token) => (dispatch) => {
  try {
    dispatch({ type: DELETE_RATE_REQUEST });

    const validToken = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}rates/${id}`, validToken)
      .then((res) => [
        dispatch({ type: DELETE_RATE_SUCCESS, payload: res.data }),
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Rate deleted',
          text2: '',
        }),
      ])
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: DELETE_RATE_FAIL, payload: error });
  }
};
