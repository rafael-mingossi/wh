import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
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
    <View>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Text style={styles.textStyle}>{value}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalOpen}
        supportedOrientations={['portrait']}
        onRequestClose={() => setModalOpen(false)}
      >
        {/* This will close the modal clicking out of it */}

        <TouchableOpacity
          onPressOut={() => setModalOpen(false)}
          style={{ flex: 1 }}
          activeOpacity={1}
          visible={modalOpen}
        >
          <TouchableWithoutFeedback>
            <View style={styles.touchableOp}>
              <Picker
                selectedValue={value}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
              >
                {pickerData(items)}
              </Picker>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomTimePicker;

const styles = StyleSheet.create({
  touchableOp: {
    backgroundColor: 'white',
    width: '100%',
    height: '35%',
    position: 'absolute',
    bottom: 0,
  },
  container: {
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
