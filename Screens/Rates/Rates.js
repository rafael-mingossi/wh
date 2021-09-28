import React, { useEffect, useState, useCallback } from 'react';
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
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';

import EasyButton from '../../Shared/EasyButton';
import RatesItem from './RatesItem';

import axios from 'axios';
import baseURL from '../../assets/baseURL';
import { alignItems } from 'styled-system';

var { width } = Dimensions.get('window');

// const RatesItem = (props) => {
//   //const { item, day } = props;
//   //console.log(item.item.day);
//   return (
//     <View style={styles.item}>
//       <View style={{ flexDirection: 'row' }}>
//         <Text style={{ fontWeight: 'bold' }}>Day: </Text>
//         <Text>{props.day}</Text>
//       </View>
//       <View style={{ flexDirection: 'row' }}>
//         <Text style={{ fontWeight: 'bold' }}>Value: </Text>
//         <Text>${props.value}</Text>
//       </View>
//       <View>
//         <EasyButton danger small onPress={() => props.delete(props.id)}>
//           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
//             X
//           </Text>
//         </EasyButton>
//       </View>
//     </View>
//   );
// };

export default function Rates({ ...props }) {
  const [day, setDay] = useState([]);
  const [value, setValue] = useState('');
  const [rates, setRates] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [requestData, setRequestData] = useState(new Date());
  const [isRender, setIsRender] = useState(false);

  const dispatch = useDispatch();

  const ratesReg = useSelector((state) => {
    return state.rateR;
  });

  const days = [
    { name: 'Saturday', id: '1' },
    { name: 'Sunday', id: '2' },
    { name: 'Public Holiday', id: '3' },
    { name: 'Weekday', id: '4' },
  ];

  useEffect(() => {
    //get Rates
    axios
      .get(`${baseURL}rates`)
      .then((res) => {
        setRates(res.data);
        dispatch({ type: 'ADD_RATE', payload: res.data });

        //console.log(res.data);
      })
      .catch((error) => alert('Error to load rates'));

    return () => {
      setRates();
    };
  }, [requestData]);

  const handleAddRate = () => {
    if (day === '' || value === '') {
      alert('cannot be empty');
    } else {
      let ratess = {
        day: day,
        value: value,
      };

      axios
        .post(`${baseURL}rates`, ratess)
        .then((res) => [
          setRates([...rates, res.data]),
          alert('rate added'),
          dispatch({ type: 'ADD_RATE', payload: [...rates, res.data] }),
        ])
        .catch((error) => {
          [
            alert(
              'This Rate already exists, please delete and create a new one'
            ),
            console.error(error),
          ];
        });
    }
  };

  const handleRemoveRate = (id) => {
    axios
      .delete(`${baseURL}rates/${id}`)
      .then((res) => {
        //console.log(res.data.success);
        const newRates = rates.filter((item) => item.id !== id);
        //const newRates = rates.splice(index, 1);
        dispatch({ type: 'ADD_RATE', payload: newRates });
        setRates(newRates);
        //console.log(newRates);
        setRequestData(new Date());
        //return [...rates];
        setIsRender(true);
      })
      .catch((error) => alert('Error to delete rate'));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(0);
      }}
      accessible={false}
    >
      <View style={{ padding: 10, marginTop: 80 }}>
        <View>
          {Platform.OS === 'android' ? (
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
              placeholder="Select your rate day"
              placeholderStyle={{ color: '#007aff' }}
              placeholderIconColor="#007aff"
              style={{ width: width / 1.6, height: 40, alignSelf: 'center' }}
              selectedValue={day}
              onValueChange={(e) => setDay(e)}
            >
              {days.map((c) => {
                return <Picker.Item key={c.id} label={c.name} value={c.name} />;
              })}
            </Picker>
          ) : (
            <TouchableOpacity
              style={styles.iosView}
              onPress={() => setModalOpen(true)}
            >
              <Text>{day.length > 0 ? day : 'Select your rate'}</Text>
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
                          fontSize: 16,
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
          }}
        >
          <TextInput
            style={styles.input}
            placeholder={'Value'}
            name={'value'}
            keyboardType={'numeric'}
            onChangeText={(text) => setValue(text)}
          />
          <EasyButton secondary medium onPress={() => handleAddRate()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              Add
            </Text>
          </EasyButton>
        </View>

        {ratesReg.length >= 1 ? (
          <FlatList
            data={rates}
            renderItem={({ item, index }) => (
              <RatesItem
                day={item.day}
                value={item.value}
                id={item._id}
                index={index}
                delete={handleRemoveRate}
              />
            )}
            keyExtractor={(item) => item._id}
            extraData={isRender}
          />
        ) : (
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            Please, add your rates here!
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
});
