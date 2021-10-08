import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InvoicesList = (props) => {
  var newDate = props.invoiceDate.split('T')[0];
  var getDay = newDate.slice(8, 10);
  var getMonth = newDate.slice(5, 7);
  var getYear = newDate.slice(0, 4);

  var newDateFormatted = getDay + '-' + getMonth + '-' + getYear;

  const navigation = useNavigation();

  return (
    <View style={styles.mainView}>
      <View>
        <Text>{`Invoice Number: ${props.invoiceNumber}`}</Text>
        <Text>{`Total Amount: $${props.invoiceAmount}`}</Text>
        <Text>{`Created on: ${newDateFormatted}`}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() =>
            navigation.navigate('InvoiceDetails', {
              invoiceDetails: props,
            })
          }
        >
          <Text style={styles.detailsTxt}>Details...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvoicesList;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    borderColor: '#5c4b4d',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#e3dcdc',
  },
  detailsBtn: {
    borderRadius: 5,
    height: 25,
    width: 65,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#5c4b4d',
    justifyContent: 'center',
  },
  detailsTxt: {
    alignSelf: 'center',
    color: 'white',
  },
});
