import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import CustomTimePicker from './CustomTimePicker';
import CustomDatePicker from './CustomDatePicker';
import ConfirmModal from './ConfirmModal';

import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomRadio from './CustomRadio';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

import moment from 'moment';
import { hours as dataHours, minutes as dataMinutes } from '../../assets/data';

var defaultDay = moment().format('DD-MM-YYYY');

const Add = ({ navigation, route }) => {
  // const getDetails = (type) => {
  //   if (route.params) {
  //     switch (type) {
  //       case 'location':
  //         return route.params.location;
  //       case 'child':
  //         return route.params.child;

  //       case 'day':
  //         return route.params.day;

  //       case 'amount':
  //         return route.params.amount;
  //     }
  //   }
  //   return '';
  // };

  const [location, setLocation] = useState('');
  const [comments, setComments] = useState('');
  const [child, setChild] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [date, setDate] = useState(defaultDay);

  const [selectedRadio, setSelectedRadio] = useState('');
  const [rateDay, setRateDay] = useState();

  const [rate, setRate] = useState();
  const [totalAmount, setTotalAmount] = useState('');

  //const [confirmModal, setConfirmModal] = useState(false);
  const [modalHSOpen, setModalHSOpen] = useState(false);
  const [modalHFOpen, setModalHFOpen] = useState(false);
  const [modalMSOpen, setModalMSOpen] = useState(false);
  const [modalMFOpen, setModalMFOpen] = useState(false);
  const [initHours, setInitHours] = useState('1');
  const [initMinutes, setInitMinutes] = useState('00');
  const [finishHours, setFinishHours] = useState('1');
  const [finishMinutes, setFinishMinutes] = useState('00');
  const [startTime, setStartTime] = useState('');
  const [finishTime, setFinishTime] = useState('');

  const [data, setData] = useState([]);

  const ratesReg = useSelector((state) => {
    return state.rateR;
  });

  const dispatch = useDispatch();

  //controlls the TIME inputs
  useEffect(() => {
    const start = initHours + ':' + initMinutes;
    const finish = finishHours + ':' + finishMinutes;

    const startDecimal = initHours + '.' + initMinutes;
    const finishDecimal = finishHours + '.' + finishMinutes;
    const hoursNotFormatted = finishDecimal - startDecimal;

    if (finishDecimal < startDecimal) {
      Alert.alert('Start time cannot be less than Finish time!');
      setStartTime('');
      setFinishTime('');
      setTotalHours('');
      setTotalAmount('');
    } else if (startDecimal < finishDecimal) {
      setStartTime(start);
      setFinishTime(finish);
      setTotalHours(hoursNotFormatted.toFixed(2).toString());

      const totalAmounts = rate * totalHours;
      setTotalAmount(totalAmounts.toFixed(2).toString());
    }
  }, [initHours, initMinutes, finishHours, finishMinutes, totalHours, rateDay]);

  const handleAddDay = () => {
    if (location === '') {
      alert('Location cannot be empty');
    } else if (child === '') {
      alert('Child cannot be empty');
    } else if (totalHours === '') {
      alert('Child cannot be empty');
    } else {
      let details = {
        rateDay,
        date,
        startTime,
        finishTime,
        location,
        child,
        totalHours,
        comments,
        totalAmount,
      };

      //console.log(details);

      axios
        .post(`${baseURL}adds`, details)
        .then((res) => [
          setData([...data, res.data]),
          alert('new day added'),
          dispatch({ type: 'ADD_DAY', payload: [...data, res.data] }),
        ])
        .catch((error) => {
          [alert('Something went wrong, try again'), console.error(error)];
        });

      setLocation('');
      setComments('');
      setChild('');
      setInitHours('1');
      setInitMinutes('00');
      setFinishHours('1');
      setFinishMinutes('00');
      setTotalHours('');
      setTotalAmount('');
    }
  };

  //essa func tava sendo usada com Flatlist e ratesReg como data
  const getRate = (day, rateValue) => {
    if (
      day === 'Sunday' ||
      day === 'Saturday' ||
      day === 'Public Holiday' ||
      day === 'Weekday'
    ) {
      setRate(rateValue);
      //console.log(rate);
    }
  };

  const onDateChange = (value) => {
    var dateFull = value.toISOString().split('T')[0];

    var getDay = dateFull.slice(8, 10);
    var getMonth = dateFull.slice(5, 7);
    var getYear = dateFull.slice(0, 4);

    var newDateFormatted = getDay + '-' + getMonth + '-' + getYear;

    setDate(newDateFormatted);
    //console.log(newDateFormatted);
  };

  // const calcRate = () => {
  //   if (location === '' || child === '') {
  //     alert('Location and Child cannot be empty');
  //   } else {
  //     const details = {
  //       rateDay,
  //       date,
  //       startTime,
  //       finishTime,
  //       location,
  //       child,
  //       totalHours,
  //       comments,
  //       totalAmount,
  //     };
  //     //console.log(details);
  //     setData(details);
  //     setConfirmModal(true);
  //   }
  // };

  const renderDays = ({ item, index }) => {
    return (
      <View style={styles.renderView}>
        <CustomRadio
          options={item.day}
          onChangeSelect={(opt, index) => {
            alert(opt);
            setSelectedRadio(index);
            getRate(item.day, item.value);
            setRateDay(opt);
          }}
          selected={selectedRadio}
          index={index}
        />
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            {ratesReg.length >= 1 ? (
              <FlatList
                data={ratesReg}
                renderItem={renderDays}
                horizontal={true}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                style={{ paddingHorizontal: 5 }}
              />
            ) : (
              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: 20,
                }}
              >
                Please, add your rates before create the invoice!
              </Text>
            )}
          </View>

          <View style={{ marginHorizontal: 20, width: '50%' }}>
            <CustomDatePicker
              textStyle={{
                marginTop: 20,
                paddingVertical: 13,
                paddingHorizontal: 10,
                borderColor: '#5c4b4d',
                borderWidth: 1,
                textAlign: 'center',
                borderRadius: 4,
                backgroundColor: '#f7f7f7',
              }}
              defaultDate={moment()}
              onDateChange={onDateChange}
            />
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              alignSelf: 'center',
            }}
          >
            <View style={{ marginRight: 10, alignItems: 'center' }}>
              <Text>Start Hour</Text>
              {Platform.OS === 'android' ? (
                <View style={styles.androidViewPicker}>
                  <Picker
                    selectedValue={initHours}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue) => setInitHours(itemValue)}
                  >
                    {dataHours?.length > 0 &&
                      dataHours.map((val, index) => (
                        <Picker.Item label={val} value={val} key={index} />
                      ))}
                  </Picker>
                </View>
              ) : (
                <CustomTimePicker
                  setModalOpen={setModalHSOpen}
                  modalOpen={modalHSOpen}
                  value={initHours}
                  setValue={setInitHours}
                  items={dataHours}
                />
              )}
            </View>
            <View>
              <Text style={{ marginTop: 28, fontSize: 17 }}>:</Text>
            </View>
            <View style={{ marginLeft: 10, alignItems: 'center' }}>
              <Text>Start Min.</Text>
              {Platform.OS === 'android' ? (
                <View style={styles.androidViewPicker}>
                  <Picker
                    selectedValue={initMinutes}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue) => setInitMinutes(itemValue)}
                  >
                    {dataMinutes?.length > 0 &&
                      dataMinutes.map((val, index) => (
                        <Picker.Item label={val} value={val} key={index} />
                      ))}
                  </Picker>
                </View>
              ) : (
                <CustomTimePicker
                  setModalOpen={setModalMSOpen}
                  modalOpen={modalMSOpen}
                  value={initMinutes}
                  setValue={setInitMinutes}
                  items={dataMinutes}
                />
              )}
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              alignSelf: 'center',
            }}
          >
            <View style={{ marginRight: 13, alignItems: 'center' }}>
              <Text>Finish Hour</Text>
              {Platform.OS === 'android' ? (
                <View style={styles.androidViewPicker}>
                  <Picker
                    selectedValue={finishHours}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue) => setFinishHours(itemValue)}
                  >
                    {dataHours?.length > 0 &&
                      dataHours.map((val, index) => (
                        <Picker.Item label={val} value={val} key={index} />
                      ))}
                  </Picker>
                </View>
              ) : (
                <CustomTimePicker
                  setModalOpen={setModalHFOpen}
                  modalOpen={modalHFOpen}
                  value={finishHours}
                  setValue={setFinishHours}
                  items={dataHours}
                />
              )}
            </View>
            <View>
              <Text style={{ marginTop: 28, fontSize: 17 }}>:</Text>
            </View>
            <View style={{ marginLeft: 13, alignItems: 'center' }}>
              <Text>Finish Min.</Text>
              {Platform.OS === 'android' ? (
                <View style={styles.androidViewPicker}>
                  <Picker
                    selectedValue={finishMinutes}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue) => setFinishMinutes(itemValue)}
                  >
                    {dataMinutes?.length > 0 &&
                      dataMinutes.map((val, index) => (
                        <Picker.Item label={val} value={val} key={index} />
                      ))}
                  </Picker>
                </View>
              ) : (
                <CustomTimePicker
                  setModalOpen={setModalMFOpen}
                  modalOpen={modalMFOpen}
                  value={finishMinutes}
                  setValue={setFinishMinutes}
                  items={dataMinutes}
                />
              )}
            </View>
          </View>

          <View style={{ width: '90%' }}>
            <TextInput
              label="Location"
              value={location}
              mode={'outlined'}
              style={styles.input}
              theme={{ colors: { primary: '#5c4b4d' } }}
              onChangeText={(text) => setLocation(text)}
            />
            <TextInput
              label="Child"
              value={child}
              mode={'outlined'}
              style={styles.input}
              theme={{ colors: { primary: '#5c4b4d' } }}
              onChangeText={(text) => setChild(text)}
            />
            <TextInput
              label="Total Hours"
              value={totalHours}
              mode={'outlined'}
              style={styles.input}
              keyboardType="number-pad"
              theme={{ colors: { primary: '#5c4b4d' } }}
              onChangeText={(text) => setTotalHours(text)}
            />
            <TextInput
              label="Other Comments"
              value={comments}
              mode={'outlined'}
              multiline={true}
              numberOfLines={3}
              style={[styles.input, { height: 60 }]}
              theme={{ colors: { primary: '#5c4b4d' } }}
              onChangeText={(text) => setComments(text)}
            />
            <Card style={styles.myCard}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Total amount: $
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {totalAmount ? totalAmount : '0.00'}
                </Text>
              </View>
            </Card>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}
          >
            <Button
              icon="content-save"
              mode="contained"
              style={{ width: 100, alignSelf: 'center', marginRight: 30 }}
              theme={{ colors: { primary: '#5c4b4d' } }}
              onPress={() => {
                handleAddDay();
              }}
            >
              Save
            </Button>

            <Button
              icon="file-check"
              mode="contained"
              style={{ width: 180, alignSelf: 'center' }}
              theme={{ colors: { primary: '#5c4b4d' } }}
              onPress={() => navigation.navigate('InputsList')}
            >
              Check Inputs
            </Button>
            {/* {confirmModal === true ? (
              <ConfirmModal
                setModalOpen={setConfirmModal}
                modalOpen={confirmModal}
                items={{ data }}
                handleDoneBtn={handleAddDay}
              />
            ) : null} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 45,
  },
  myCard: {
    margin: 5,
    padding: 15,
    backgroundColor: '#f0eeeb',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  renderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  androidViewPicker: {
    borderWidth: 1,
    borderRadius: 4,
    width: 95,
    borderColor: '#5c4b4d',
    height: 49,
  },
});
