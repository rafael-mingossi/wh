import {
  INVOICE_REQUEST,
  INVOICE_SUCCESS,
  INVOICE_FAIL,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
  ITEMS_REQUEST,
  ITEMS_SUCCESS,
  ITEMS_FAIL,
  AMOUNT_REQUEST,
  AMOUNT_SUCCESS,
  AMOUNT_FAIL,
  NUMBER_REQUEST,
  NUMBER_SUCCESS,
  NUMBER_FAIL,
} from '../constants';

import baseURL from '../../assets/baseURL';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getInvoicesHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_REQUEST });

    axios
      .get(`${baseURL}invoices`)
      .then((res) => {
        if (res) {
          const data = res.data;

          //filter by current user
          const userInputs = data.filter((invoice) => invoice.user == id);

          dispatch({
            type: INVOICE_SUCCESS,
            payload: userInputs,
          });
        }
      })
      .catch((error) => console.log('Error to load Invoices'));

    return () => {
      setInvoices();
    };
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: INVOICE_FAIL, payload: error });
  }
};

export const deleteInvoceHanler = (id, token) => (dispatch) => {
  try {
    dispatch({ type: DELETE_INVOICE_REQUEST });

    const validToken = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}invoices/${id}`, validToken)
      .then((res) => [
        dispatch({ type: DELETE_INVOICE_SUCCESS, payload: res.data }),

        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Invoice deleted',
          text2: '',
        }),
      ])
      .catch((error) => console.log(error));
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: DELETE_INVOICE_FAIL, payload: error });
  }
};

export const getAmountHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: AMOUNT_REQUEST });

    await axios
      .get(`${baseURL}adds/invoiceamounts/${userId}`)
      .then((res) => {
        if (res) {
          dispatch({
            type: AMOUNT_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => console.error(error));
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: AMOUNT_FAIL, payload: error });
  }
};

export const getInvNumberHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: NUMBER_REQUEST });

    await axios
      .get(`${baseURL}invoices/numbers/${userId}`)
      .then((res) => {
        if (res) {
          dispatch({
            type: NUMBER_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => console.error(error));
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: NUMBER_FAIL, payload: error });
  }
};

export const getItemsHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ITEMS_REQUEST });

    await axios
      .get(`${baseURL}adds/amounts/${userId}`)
      .then((res) => {
        if (res) {
          dispatch({
            type: ITEMS_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => console.error(error));
  } catch (error) {
    //component can be added here to better output the error to the user
    dispatch({ type: ITEMS_FAIL, payload: error });
  }
};
