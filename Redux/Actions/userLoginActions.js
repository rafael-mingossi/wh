import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from './rateActions';

import { useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../assets/baseURL';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../Shared/CredentialsContext';

// Implementing Redux in MERN Stack - MERN Stack Tutorial #11
// nos 19:00

export const userLoginHandler = (email, password) => async (dispatch) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const persistLogin = (credentials) => {
    AsyncStorage.setItem('userCredentials', JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((err) => console.log(err));
  };

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const userLogin = {
      email,
      password,
    };

    if (email === '' || password === '') {
      alert('Please fill in your credentials');
    } else {
      const { data } = await axios
        .post(`${baseUrl}users/login`, userLogin)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Registration Succeded',
              text2: 'Please login to continue',
            });
            persistLogin(res.data);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    //component can be added here to better output the error to the user
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err,
    });
  }
};

//aplicacao do logout nos 22:50 de video

export const userLogOutHandler = () => async (dispatch) => {
  AsyncStorage.removeItem('userCredentials')
    .then(() => {
      setStoredCredentials('');
    })
    .catch((err) => console.log(err));
  dispatch({ type: USER_LOGOUT });
};
