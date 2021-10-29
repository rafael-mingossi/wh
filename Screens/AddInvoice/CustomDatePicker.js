import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const CustomDatePicker = (props) => {
  const { textStyle, defaultDate } = props;
  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    //var formatDate = selectedDate.toString().split('T')[0];

    setDate(moment(selectedDate));
    props.onDateChange(selectedDate);
    //console.log(formatDate);
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    //var formatDate = selectedDate.toISOString().split('T')[0];
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  };

  const onCancelPress = () => {
    setDate(moment(defaultDate));
    setShow(false);
  };

  const onDonePress = () => {
    props.onDateChange(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        maximumDate={new Date(moment(defaultDate))}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    );
  };

  return (
    <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
      <View>
        <Text style={textStyle}>{date.format('DD/MM/YYYY')}</Text>
        {Platform.OS !== 'ios' && show && renderDatePicker()}
        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              {/* This will close the modal clicking out of it */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={'#FFFFFF'}
                  style={{
                    flex: 1,
                    borderTopColor: '#E9E9E9',
                    borderTopWidth: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: 256,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onCancelPress}
                      style={styles.btnTextL}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onDonePress}
                      style={styles.btnTextR}
                    >
                      <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </TouchableOpacity>
  );
};

CustomDatePicker.defaultProps = {
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
};

export default CustomDatePicker;

const styles = StyleSheet.create({
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
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});
