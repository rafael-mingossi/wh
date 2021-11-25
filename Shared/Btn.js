import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Colors from '../Shared/colors';

const Btn = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.viewBtn, ...props.style }}
        onPress={() => props.clickFn()}
      >
        <Text style={styles.txtBtn}>{props.btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Btn;

const styles = StyleSheet.create({
  viewBtn: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 120,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    justifyContent: 'center',
  },
  txtBtn: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
