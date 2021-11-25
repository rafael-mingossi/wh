import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Platform,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import { CredentialsContext } from '../../Shared/CredentialsContext';

import { useSelector, useDispatch } from 'react-redux';

import Btn from '../../Shared/Btn';
import RatesItem from './RatesItem';
import Colors from '../../Shared/colors';

import {
  getRatesHandler,
  addRateHandler,
  deleteRateHanler,
} from '../../Redux/Actions/rateActions';

var { width } = Dimensions.get('window');

export default function Rates() {
  const [day, setDay] = useState('Saturday');
  const [value, setValue] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  //redux get rates
  const rateR = useSelector((state) => state.rateR);
  const { loading } = rateR;

  //redux add rates
  const addRateR = useSelector((state) => state.addRateR);
  const { success } = addRateR;

  //redux delete rates
  const deleteRateR = useSelector((state) => state.deleteRateR);
  const { success: successDel } = deleteRateR;

  //context
  const { storedCredentials } = useContext(CredentialsContext);
  const { token, userId } = storedCredentials;

  const days = [
    { name: 'Saturday', id: '1' },
    { name: 'Sunday', id: '2' },
    { name: 'Public Holiday', id: '3' },
    { name: 'Weekday', id: '4' },
  ];

  useEffect(() => {
    dispatch(getRatesHandler(userId));
  }, [dispatch, success, successDel]);

  const submitRateHandler = () => {
    if (!day || !value) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Day and Value must be provided',
        text2: '',
      });
    } else if (!userId || !token) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again',
      });
    }
    dispatch(addRateHandler(day, value, userId, token));
  };

  const delRateHandler = (id) => {
    dispatch(deleteRateHanler(id, token));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(0);
      }}
      accessible={false}
    >
      <View style={{ padding: 10, marginTop: 30 }}>
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            backgroundColor: Colors.secondaryGray,
            width: '70%',
            alignSelf: 'center',
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <Text style={styles.headerTxt}>Select your Rates</Text>
        </View>
        <View>
          {Platform.OS === 'android' ? (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: '60%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
                placeholder=". . ."
                placeholderStyle={{ color: '#007aff' }}
                style={{
                  width: '90%',
                  height: 40,
                  alignSelf: 'center',
                }}
                selectedValue={day}
                onValueChange={(e) => setDay(e)}
              >
                {days.map((c) => {
                  return (
                    <Picker.Item key={c.id} label={c.name} value={c.name} />
                  );
                })}
              </Picker>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.iosView}
              onPress={() => setModalOpen(true)}
            >
              <Text>{day}</Text>
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
                        style={{
                          fontWeight: 'bold',
                          marginLeft: 10,
                          fontSize: 18,
                        }}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opacityModalView}>
                      <Picker
                        selectedValue={day}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                          setDay(itemValue)
                        }
                      >
                        {days.map((val) => {
                          return (
                            <Picker.Item
                              label={val.name}
                              value={val.name}
                              key={val.id}
                            />
                          );
                        })}
                      </Picker>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            marginBottom: 15,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TextInput
            style={styles.input}
            placeholder={'Value'}
            name={'value'}
            keyboardType={'numeric'}
            onChangeText={(text) => setValue(text)}
          />
          <Btn
            btnTitle={'Add'}
            clickFn={submitRateHandler}
            style={styles.btn}
          />
        </View>
        {loading && <ActivityIndicator size="large" color="red" />}
        {rateR ? (
          <FlatList
            data={rateR.rates}
            renderItem={({ item, index }) => (
              <RatesItem
                day={item.day}
                value={item.value}
                id={item._id}
                index={index}
                delete={delRateHandler}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            Please, add your rates to start!
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerT: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  input: {
    height: 40,
    borderColor: '#5c4b4d',
    borderWidth: 1,
    borderRadius: 5,
    width: width / 3.8,
    fontSize: 16,
    padding: 5,
    marginTop: 5,
  },
  iosView: {
    borderWidth: 1,
    width: width / 2,
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    padding: 7,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#5c4b4d',
  },
  touchableOp: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
  },
  opacityModalView: {
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
  },
  opacityModalTxt: {
    fontSize: 18,
    padding: 15,
  },
  spinner: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 40,
    margin: 5,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
