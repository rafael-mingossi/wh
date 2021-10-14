const addInvoices = (invoicesObj) => {
  return {
    type: 'ADD_INVOICE',
    payload: invoicesObj,
  };
};

const setInvoices = () => {
  return {
    type: 'SET_INVOICE',
  };
};

export default {
  setInvoices,
  addInvoices,
};
