import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import InvoicesList from './InvoicesList';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

const Invoices = ({ navigation }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const invoicesRed = useSelector((state) => {
    return state.invoicesR;
  });

  //console.log(invoices);

  useEffect(() => {
    navigation.addListener('focus', () => {
      axios
        .get(`${baseURL}invoices`)
        .then((res) => {
          setInvoices(res.data);
          //dispatch({ type: 'ADD_DAY', payload: res.data });

          //console.log(res.data);

          setLoading(false);
        })
        .catch((error) => alert('Error to load Invoices'));

      return () => {
        setInvoices();
      };
    });
  }, [navigation]);

  const renderInvoices = ({ item }) => {
    return (
      <View style={styles.renderView}>
        <InvoicesList
          invoiceNumber={item.invoiceNumber}
          invoiceDate={item.invoiceDate}
          invoiceAmount={item.invoiceAmount}
          invoiceItems={item.invoiceItems}
          invoiceId={item._id}
          deleteInvoice={handleRemoveInvoice}
        />
      </View>
    );
  };

  const fetchInvoices = () => {
    axios
      .get(`${baseURL}invoices`)
      .then((res) => {
        setInvoices(res.data);
        //dispatch({ type: 'ADD_DAY', payload: res.data });

        //console.log(res.data);

        setLoading(false);
      })
      .catch((error) => alert('Error to load Invoices'));

    return () => {
      setInvoices();
    };
  };

  const handleRemoveInvoice = (id) => {
    axios
      .delete(`${baseURL}invoices/${id}`)
      .then((res) => {
        //console.log(res.data.success);
        const newInvoicesList = invoices.filter((item) => item.id !== id);
        //const newRates = rates.splice(index, 1);
        //dispatch({ type: 'ADD_RATE', payload: newRates });
        setInvoices(newInvoicesList);
        //console.log(newRates);
        //setRequestData(new Date());
        //return [...rates];
        //setIsRender(true);
      })
      .catch((error) => alert('Error to delete invoice'));
  };

  return (
    <View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : invoices.length == 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>
          You don't have any invoices created!
        </Text>
      ) : (
        <FlatList
          data={invoices}
          renderItem={renderInvoices}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchInvoices()}
          refreshing={loading}
        />
      )}
    </View>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  spinner: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
