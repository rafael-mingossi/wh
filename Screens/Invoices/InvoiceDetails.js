import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

var { height } = Dimensions.get('window');

const InvoiceDetails = (props) => {
  const { invoiceDetails } = props.route.params;
  //console.log(invoiceDetails);

  var newDate = invoiceDetails.invoiceDate.split('T')[0];
  var getDay = newDate.slice(8, 10);
  var getMonth = newDate.slice(5, 7);
  var getYear = newDate.slice(0, 4);

  var newDateFormatted = getDay + '-' + getMonth + '-' + getYear;

  return (
    <View>
      <View>
        <View style={styles.viewBtnReturnDelete}>
          <TouchableOpacity
            style={styles.btnReturn}
            onPress={() => props.navigation.navigate('Invoices')}
          >
            <Ionicons name="return-down-back" size={20} color="white" />
            <Text style={styles.txtReturnBtn}>Return</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => console.log('DELETE')}
          >
            <MaterialIcons name="delete-forever" size={20} color="white" />
            <Text style={styles.txtReturnBtn}>Delete</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.txtInvoiceNum}
        >{`Invoice Number: ${invoiceDetails.invoiceNumber}`}</Text>
        <View style={styles.viewAmountDate}>
          <Text
            style={styles.txtAmountDate}
          >{`Total Amount: $${invoiceDetails.invoiceAmount}`}</Text>
          <Text
            style={styles.txtAmountDate}
          >{`Date: ${newDateFormatted}`}</Text>
        </View>
      </View>

      <View style={styles.viewItems}>
        <Text style={styles.txtInvoiceItems}>Invoice Items: </Text>
        <View style={styles.scrollview}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {invoiceDetails.invoiceItems.map((invoiceItemDetails) => {
              //console.log(invoiceItemDetails.items[0].child);
              return invoiceItemDetails.items.map((itemDetails) => {
                //console.log(itemDetails);
                return (
                  <View key={itemDetails._id} style={styles.viewListItems}>
                    <View style={styles.viewInsidelistItem}>
                      <Text>{`Date: ${itemDetails.date}`}</Text>
                      <Text>{`Child: ${itemDetails.child}`}</Text>
                    </View>
                    <View style={styles.viewInsidelistItem}>
                      <Text>{`Start Time: ${itemDetails.startTime}`}</Text>
                      <Text>{`Finish Time: ${itemDetails.finishTime}`}</Text>
                    </View>
                    <View style={styles.viewInsidelistItem}>
                      <Text>{`Total: $${itemDetails.totalAmount}`}</Text>
                      <Text>{`Hours: ${itemDetails.totalHours}`}</Text>
                      <Text>{`Location: ${itemDetails.location}`}</Text>
                    </View>

                    <Text style={{ margin: 10, textAlign: 'center' }}>
                      ----------------------
                    </Text>
                  </View>
                );
              });
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  btnReturn: {
    padding: 7,
    flexDirection: 'row',
    width: 90,
    backgroundColor: '#5c4b4d',
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    textAlign: 'center',
  },
  btnDelete: {
    padding: 7,
    flexDirection: 'row',
    width: 90,
    backgroundColor: '#5c4b4d',
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    textAlign: 'center',
  },
  txtReturnBtn: {
    color: 'white',
    marginLeft: 5,
    fontSize: 15,
    alignSelf: 'center',
  },
  txtInvoiceNum: {
    textAlign: 'center',
    fontSize: 19,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#5c4b4d',
    color: 'white',
  },
  viewAmountDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#5c4b4d',
  },
  txtAmountDate: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewItems: {
    borderWidth: 1,
    borderColor: '#5c4b4d',
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    height: height / 1.7,
    paddingBottom: 10,
  },
  txtInvoiceItems: {
    textAlign: 'center',
    fontSize: 15,
    margin: 10,
    backgroundColor: '#5c4b4d',
    color: 'white',
  },
  viewListItems: {
    backgroundColor: '#e3e3e3',
  },
  scrollview: {
    borderColor: '#5c4b4d',
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    height: height / 1.9,
  },
  viewInsidelistItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewBtnReturnDelete: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
