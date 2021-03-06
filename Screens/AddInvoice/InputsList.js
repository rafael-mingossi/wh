import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import InpustListItem from './InputsListItem';
import { Button, Card, RadioButton } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import baseURL from '../../assets/baseURL';

const InputsList = ({ navigation }) => {
  const [inputs, setInputs] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const [invoiceItems, setInvoiceItems] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('0');
  const [invoices, setInvoices] = useState([]);
  const [currentAmount, setCurrentAmount] = useState();
  const [currentAmounts, setCurrentAmounts] = useState();
  const [invStatus, setInvStatus] = useState();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const inputsReg = useSelector((state) => {
    return state.inputR;
  });

  useEffect(() => {
    //get Inputs
    axios
      .get(`${baseURL}adds`)
      .then((res) => {
        setInputs(res.data);
        //this will get only the inputs with status 'open'
        setInvStatus(
          res.data.filter((filt) => filt.status === 'open').map((el) => el)
        );
        //console.log(invStatus);
        dispatch({ type: 'ADD_DAY', payload: res.data });
        setLoading(false);
      })
      .catch((error) => alert('Error to load inputs'));

    return () => {
      setInputs();
    };
  }, [requestData, invoices]);

  useEffect(() => {
    //get IDs
    axios
      .get(`${baseURL}adds/invoiceids`)
      .then((res) => {
        setInvoiceItems([{ items: res.data }]);
        //console.log(res.data);
      })
      .catch((error) => alert('Error to load inputs'));

    //get total amounts
    axios
      .get(`${baseURL}adds/amounts`)
      .then(async (res) => {
        //console.log(res.data);
        const totalAmount = await res.data.reduce((a, b) => a + b, 0);
        setCurrentAmount(totalAmount);
      })
      .catch((error) => console.error(error));

    //get invoice Number
    axios
      .get(`${baseURL}invoices/numbers`)
      .then((res) => {
        if (res.data.length <= 0) {
          setInvoiceNumber('1');
        } else {
          setInvoiceNumber((res.data[0] + 1).toString());
        }
        //console.log(res.data[0]);
      })
      .catch((error) => alert('Error to load invoice numbers'));

    return () => {
      setInvoiceItems();
      setCurrentAmount();
      setInvoiceNumber();
    };
  }, [inputs]);

  const handleRemoveRate = (id) => {
    axios
      .delete(`${baseURL}adds/${id}`)
      .then((res) => {
        const newList = inputs.filter((item) => item.id !== id);
        dispatch({ type: 'ADD_DAY', payload: newList });
        setInputs(newList);
        setRequestData(new Date());
      })
      .catch((error) => alert('Error to delete item'));
  };

  const handleCreateInvoice = () => {
    if (!invoiceItems || inputs.length < 0) {
      alert('You have no worked days added!');
    } else if (invoiceNumber === '') {
      alert('Invoice Number cannot be empty!');
    } else {
      let invoiceDetails = {
        invoiceItems,
        invoiceNumber,
        invoiceAmount,
      };

      axios
        .post(`${baseURL}invoices`, invoiceDetails)
        .then((res) => [
          setInvoices(res.data),
          alert('invoice created'),
          //dispatch({ type: 'ADD_RATE', payload: [...rates, res.data] }),

          axios
            .post(`${baseURL}adds/all`)
            .then((res) => {
              //console.log(res.data);
            })
            .catch((error) => {
              console.error(error);
            }),

          setTimeout(() => {
            navigation.navigate('Invoices');
          }, 600),
        ])
        .catch((error) => {
          [alert('This invoice number already exists'), console.error(error)];
        });
    }
  };

  if (loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(0);
      }}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.fieldsView}>
          <View style={{ flexDirection: 'row', width: '100%', left: 45 }}>
            <View style={{ marginRight: 4, alignItems: 'center' }}>
              <Text>Invoice</Text>
              <Text>Amount</Text>
            </View>
            <View style={styles.amountView}>
              <Text style={{ fontWeight: 'bold' }}>
                {currentAmount ? `$ ${currentAmount}` : '$ 0.00'}
              </Text>
            </View>
          </View>
          <View style={styles.invoiceNoView}>
            <View style={{ marginRight: 4, alignItems: 'center' }}>
              <Text>Invoice</Text>
              <Text>No.</Text>
            </View>
            <TextInput
              label="Invoice No."
              value={invoiceNumber}
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => setInvoiceNumber(text)}
            />
          </View>
        </View>
        <View style={{ marginBottom: 60, marginTop: 50 }}>
          <FlatList
            data={invStatus}
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
                delete={handleRemoveRate}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
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
    </TouchableWithoutFeedback>
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
