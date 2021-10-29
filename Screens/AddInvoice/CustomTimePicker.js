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
          <View style={{ marginTop: 505 }}>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text
                style={{
                  backgroundColor: '#5c4b4d',
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
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
  viewDoneBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 520,
  },
  btnTextL: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  btnTextR: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
});
