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

export const invoicesReducers = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case INVOICE_REQUEST:
      return { loading: true };
    case INVOICE_SUCCESS:
      return { loading: false, invoices: action.payload };
    case INVOICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteInvoicesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVOICE_REQUEST:
      return { loading: true };
    case DELETE_INVOICE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_INVOICE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const invoiceItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEMS_REQUEST:
      return { loading: true };
    case ITEMS_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEMS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const invoiceAmountReducer = (state = { amount: '' }, action) => {
  switch (action.type) {
    case AMOUNT_REQUEST:
      return { loading: true };
    case AMOUNT_SUCCESS:
      return { loading: false, amount: action.payload };
    case AMOUNT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const invoiceNumberReducer = (state = { number: '' }, action) => {
  switch (action.type) {
    case NUMBER_REQUEST:
      return { loading: true };
    case NUMBER_SUCCESS:
      return { loading: false, number: action.payload };
    case NUMBER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
