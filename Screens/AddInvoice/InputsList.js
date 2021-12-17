import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import InpustListItem from './InputsListItem';
import { Button, Card, RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { CredentialsContext } from '../../Shared/CredentialsContext';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import baseURL from '../../assets/baseURL';

import {
  getAddedDaysHandler,
  deleteAddedDayHanler,
} from '../../Redux/Actions/addDayActions';

import {
  getAmountHandler,
  getItemsHandler,
  getInvNumberHandler,
} from '../../Redux/Actions/invoicesActions';

const InputsList = ({ navigation }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const dispatch = useDispatch();

  //context
  const { storedCredentials } = useContext(CredentialsContext);
  const { token, userId } = storedCredentials;

  //redux get added days
  const dayR = useSelector((state) => state.dayR);
  const { loading: loadingD, inputs, success: addSuccess } = dayR;

  //redux get invoice items
  const invoiceItemsR = useSelector((state) => state.invoiceItemsR);
  const { items, loading: loadingR } = invoiceItemsR;
  //console.log(items);

  //redux get invoice number
  const invoiceNumberR = useSelector((state) => state.invoiceNumberR);
  const { number, loading: loadingN } = invoiceNumberR;

  //redux get invoice amount
  const invoiceAmountR = useSelector((state) => state.invoiceAmountR);
  const { loading: loadingA, amount } = invoiceAmountR;
  //console.log(amount);

  //redux delete added days
  const deleteDayR = useSelector((state) => state.deleteDayR);
  const { success: successDel } = deleteDayR;

  const delDayHandler = (id) => {
    dispatch(deleteAddedDayHanler(id, token));
  };

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     dispatch(getInvNumberHandler(userId));

  //     if (number) {
  //       setInvoiceNumber(number.toString());
  //     }
  //   });
  // }, [dispatch, successDel, invoices, addSuccess]);

  useEffect(() => {
    dispatch(getItemsHandler(userId));
    dispatch(getAddedDaysHandler(userId));
    dispatch(getAmountHandler(userId));
    dispatch(getInvNumberHandler(userId));

    if (number) {
      setInvoiceNumber(number.toString());
    }
  }, [dispatch, successDel, invoices, addSuccess, updateList]);

  const handleCreateInvoice = () => {
    if (!items || inputs.length < 0 || amount == '$ 0.00') {
      alert('You have no worked days added!');
    } else if (number === '') {
      alert('Invoice Number cannot be empty!');
    } else {
      let invoiceDetails = {
        invoiceItems: items,
        invoiceNumber: number,
        amount,
        user: userId,
      };

      const validToken = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(`${baseURL}invoices`, invoiceDetails, validToken)
        .then((res) => [
          setInvoices(res.data),

          //alert('invoice created'),
          //dispatch({ type: 'GET_INVOICE', payload: res.data }),
        ])
        .catch((error) => {
          [alert('This invoice number already exists'), console.error(error)];
        });

      let statusUpdate = {
        user: userId,
      };
      setTimeout(() => {
        axios
          .post(`${baseURL}adds/all`, statusUpdate, validToken)
          .then((res) => {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Invoice Created',
              text2: 'Check Invoice Tab to see details',
            });
            setUpdateList(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    }
  };

  if (loadingD) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldsView}>
        <View style={{ flexDirection: 'row', width: '100%', left: 45 }}>
          <View style={{ marginRight: 4, alignItems: 'center' }}>
            <Text>Invoice</Text>
            <Text>Amount</Text>
          </View>

          <View style={styles.amountView}>
            {amount ? (
              <Text style={{ fontWeight: 'bold' }}>$ {amount}</Text>
            ) : (
              <Text style={{ fontWeight: 'bold' }}>$ 0.00</Text>
            )}
          </View>
        </View>
        <View style={styles.invoiceNoView}>
          <View style={{ marginRight: 4, alignItems: 'center' }}>
            <Text>Invoice</Text>
            <Text>No.</Text>
          </View>
          {loadingN ? null : (
            <TextInput
              label="Invoice No."
              value={number.toString()}
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => setInvoiceNumber(text)}
            />
          )}
        </View>
      </View>
      <View style={{ marginBottom: 60, marginTop: 50 }}>
        {inputs ? (
          <FlatList
            data={inputs}
            renderItem={({ item, index }) => (
              <InpustListItem
                day={item.rateDay}
                start={item.startTime}
                id={item._id}
                index={index}
                finish={item.finishTime}
                child={item.child}
                date={item.date}
                location={item.location}
                status={item.status}
                amount={item.totalAmount}
                hours={item.totalHours}
                delete={delDayHandler}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        ) : (
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              marginVertical: 100,
            }}
          >
            Please, add your worked days to start!
          </Text>
        )}
      </View>

      <View style={styles.viewBtn}>
        <Button
          icon="content-save"
          mode="contained"
          style={{ width: 190, alignSelf: 'center', marginRight: 30 }}
          theme={{ colors: { primary: '#5c4b4d' } }}
          onPress={() => handleCreateInvoice()}
        >
          Create Invoice
        </Button>
        <Button
          icon="keyboard-return"
          mode="contained"
          style={{ width: 120, alignSelf: 'center' }}
          theme={{ colors: { primary: '#5c4b4d' } }}
          onPress={() => navigation.navigate('Add')}
        >
          Return
        </Button>
      </View>
    </View>
  );
};

export default InputsList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  viewBtn: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '60%',
    height: 30,
    borderWidth: 1,
    borderColor: '#5c4b4d',
    textAlign: 'center',
    height: 35,
  },
  fieldsView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,

    width: '100%',
    justifyContent: 'space-around',
  },
  amountView: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 8,
    width: '30%',
    borderColor: '#5c4b4d',
    alignItems: 'center',
  },
  invoiceNoView: {
    width: '30%',
    flexDirection: 'row',
    right: 55,
  },
  spinner: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
