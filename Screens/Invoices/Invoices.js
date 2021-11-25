import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { CredentialsContext } from '../../Shared/CredentialsContext';

import { useSelector, useDispatch } from 'react-redux';

import InvoicesList from './InvoicesList';

import {
  getInvoicesHandler,
  deleteInvoceHanler,
} from '../../Redux/Actions/invoicesActions';

const Invoices = ({ navigation }) => {
  //context
  const { storedCredentials } = useContext(CredentialsContext);
  const { token, userId } = storedCredentials;

  const dispatch = useDispatch();

  //redux get invoices
  const invoicesR = useSelector((state) => state.invoicesR);
  const { invoices, loading, success } = invoicesR;

  //redux delete invoices
  const deleteInvoicesR = useSelector((state) => state.deleteInvoicesR);
  const { success: successDel } = deleteInvoicesR;

  //console.log(invoicesR.invoices);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getInvoicesHandler(userId));
    });
  }, [dispatch, successDel, navigation]);

  const delInvoiceHandler = (id) => {
    dispatch(deleteInvoceHanler(id, token));
  };

  const renderInvoices = ({ item }) => {
    return (
      <View style={styles.renderView}>
        <InvoicesList
          invoiceNumber={item.invoiceNumber}
          invoiceDate={item.invoiceDate}
          invoiceAmount={item.invoiceAmount}
          invoiceItems={item.invoiceItems}
          invoiceId={item._id}
          deleteInvoice={delInvoiceHandler}
        />
      </View>
    );
  };

  return (
    <View>
      {loading && <ActivityIndicator size="large" color="red" />}
      {!invoices ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>
          You don't have any invoices created!
        </Text>
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
