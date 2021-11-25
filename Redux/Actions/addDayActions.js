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

import baseURL from '../../assets/baseURL';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getAddedDaysHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DAY_REQUEST });

    await axios
      .get(`${baseURL}adds`)
      .then((res) => {
        if (res) {
          const data = res.data;

          //filter by current user
          const userInputs = data.filter((invoice) => invoice.user == id);

          //this will get only the inputs with status 'open'
          const filteredInputs = userInputs
            .filter((filt) => filt.status === 'open')
            .map((el) => el);

          if (filteredInputs) {
            dispatch({
              type: GET_DAY_SUCCESS,
              payload: filteredInputs,
            });
          }
        }
      })
      .catch((error) => console.log(`Error loading Inputs: ${error}`));
  } catch (err) {
    //component can be added here to better output the error to the user
    dispatch({ type: GET_DAY_FAIL, payload: error });
  }
};

export const addNewDayHandle =
  (
    rateDay,
    date,
    startTime,
    finishTime,
    location,
    child,
    totalHours,
    comments,
    totalAmount,
    user,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_DAY_REQUEST });

      const validToken = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(
          `${baseURL}adds`,
          {
            rateDay,
            date,
            startTime,
            finishTime,
            location,
            child,
            totalHours,
            comments,
            totalAmount,
            user,
          },

          validToken
        )
        .then((res) => [
          dispatch({ type: ADD_DAY_SUCCESS, payload: res.data }),
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'New worked day added',
            text2: '',
          }),
        ])
        .catch((error) => {
          [
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Something went wrong',
              text2: 'Please try again',
            }),
            console.error(error),
          ];
        });
    } catch (error) {
      //component can be added here to better output the error to the user
      dispatch({ type: ADD_DAY_FAIL, payload: error });
    }
  };

export const deleteAddedDayHanler = (id, token) => (dispatch) => {
  try {
    dispatch({ type: DELETE_DAY_REQUEST });

    const validToken = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}adds/${id}`, validToken)
      .then((res) => [
        dispatch({ type: DELETE_DAY_SUCCESS, payload: res.data }),
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Input deleted',
          text2: '',
        }),
      ])
      .catch((error) => console.error(error));
  } catch (err) {
    //component can be added here to better output the error to the user
    dispatch({ type: DELETE_DAY_FAIL, payload: error });
  }
};
