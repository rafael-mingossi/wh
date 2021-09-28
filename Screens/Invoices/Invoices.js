import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import InvoicesList from './InvoicesList';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderInvoices = ({ item, index }) => {
    return (
      <View style={styles.renderView}>
        <InvoicesList
          invoiceNumber={item.invoiceNumber}
          invoiceDate={item.invoiceDate}
          invoiceAmount={item.invoiceAmount}
          invoiceId={item._id}
        />
      </View>
    );
  };

  useEffect(() => {
    setLoading(true);
    //get Inputs
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
  }, []);

  return (
    <View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : invoices.length == 0 ? (
        <Text>You don't have any invoices created</Text>
      ) : (
        <FlatList
          data={invoices}
          renderItem={renderInvoices}
          keyExtractor={(item) => item._id}
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
