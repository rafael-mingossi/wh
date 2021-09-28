import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

const CustomTimePicker = ({
  modalOpen,
  setModalOpen,
  value,
  setValue,
  items,
}) => {
  const pickerData = (data) => {
    return (
      data?.length > 0 &&
      data.map((val, index) => (
        <Picker.Item label={val} value={val} key={index} />
      ))
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalOpen(true)}
    >
      <Text style={styles.textStyle}>{value}</Text>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.touchableOp}>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text
                style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}
              >
                Close
              </Text>
            </TouchableOpacity>
            <Picker
              selectedValue={value}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
            >
              {pickerData(items)}
            </Picker>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default CustomTimePicker;

const styles = StyleSheet.create({
  touchableOp: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderColor: '#5c4b4d',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 4,
    width: 70,
    backgroundColor: '#f7f7f7',
  },
});
