import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Select, Picker, Container, Content, Form } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';

import EasyButton from '../../Shared/EasyButton';
import RatesItem from './RatesItem';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

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
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState(new Date());

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
    setLoading(true);
    //get Rates
    axios
      .get(`${baseURL}rates`)
      .then((res) => {
        setRates(res.data);
        dispatch({ type: 'ADD_RATE', payload: res.data });
        setLoading(false);
        //console.log(res.data);
      })
      .catch((error) => alert('Error to load rates'));

    return () => {
      setRates();
    };
  }, []);

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
      })
      .catch((error) => alert('Error to delete rate'));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
      accessible={false}
    >
      <View style={{ padding: 10, marginTop: 80 }}>
        <View>
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
            extraData={rates}
          />
        ) : (
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            No rates added
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
    borderColor: 'gray',
    borderWidth: 1,
    width: width / 2.9,
    fontSize: 16,
    padding: 5,
    marginTop: 5,
  },
});

//backup ADD_RATE

// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Modal,
//   Date,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import Form from '../../Shared/Form';
// import Input from '../../Shared/Input';
// import EasyButton from '../../Shared/EasyButton';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import DatePicker from 'react-native-date-picker';

// import axios from 'axios';
// import baseURL from '../../assets/baseURL';

// //var today = new Date();
// //https://github.com/henninghall/react-native-date-picker

// const Add = () => {
//   const [rates, setRates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sat, setSat] = useState();
//   //const [date, setDate] = useState(today.getDate());
//   const [date, setDate] = useState();
//   const [text, setText] = useState('Empty');
//   const [show, setShow] = useState(false);
//   const [mode, setMode] = useState('date');

//   const [startTime, setStartTime] = useState();

//   useEffect(() => {
//     //get Rates
//     axios
//       .get(`${baseURL}rates`)
//       .then((res) => {
//         setRates(res.data);
//         setLoading(false);
//       })
//       .catch((error) => alert('Error to load rates'));

//     return () => {
//       setRates();
//       setLoading(true);
//     };
//   }, []);

//   return (
//     <KeyboardAwareScrollView
//       viewIsInsideTabBar={true}
//       extraHeight={200}
//       enableOnAndroid={true}
//     >
//       <Form>
//         <Input
//           placeholder={'Location'}
//           name={'ShippingAddress2'}
//           //value={address2}
//           //onChangeText={(text) => setAddress2(text)}
//         />
//         <Input
//           placeholder={'Child'}
//           name={'city'}
//           //value={city}
//           //onChangeText={(text) => setCity(text)}
//         />
//         <Input
//           placeholder={'Other Comments'}
//           name={'city'}
//           //value={city}
//           //onChangeText={(text) => setCity(text)}
//         />
//         <Input
//           placeholder={'Total Hours'}
//           name={'zip'}
//           keyboardType={'numeric'}
//           //value={zip}
//           //onChangeText={(text) => setZip(text)}
//         />
//         <Text style={{ padding: 20, fontSize: 20 }}>Total Amount: $500</Text>

//         <View style={{ width: '80%', alignItems: 'center' }}>
//           <EasyButton primary medium>
//             <Text>Add</Text>
//           </EasyButton>
//         </View>
//       </Form>
//     </KeyboardAwareScrollView>
//   );
// };

// export default Add;

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

{
  /* <Modal
  transparent={true}
  animationType="slide"
  visible={show}
  onRequestClose={() => setShow(false)}
>
  <View style={{ flex: 1 }}>
    <TouchableHighlight
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
        onPress={() => console.log('datepicker clicked')}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: '40%',
            overflow: 'hidden',
          }}
        >
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          {rangeHours.map(function (val) {
            return (
              <Text
                style={{
                  fontSize: 19,
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                {val}
              </Text>
            );
          })}
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  </View>
</Modal>; */
}

//RADIO BUTTON COM FLATLIST, FUNCIONA SO NAO TEM ESTILO PRA IOS
// <FlatList
//   data={ratesReg}
//   renderItem={renderDays}
//   horizontal={true}
//   keyExtractor={(item) => item._id}
//   showsHorizontalScrollIndicator={false}
//   style={{ paddingHorizontal: 5 }}
// />
// const renderDays = ({ item, index }) => {
//   return (
//     <View style={styles.renderView}>
//       <RadioButton
//         value={item.day}
//         status={checked === item.day ? 'checked' : 'unchecked'}
//         onPress={() => [
//           setChecked(item.day),
//           getRate(item.day, item.value),
//           console.log(item),
//         ]}
//         color="black"
//       />
//       <Text style={{ fontSize: 16, marginTop: 7 }}>{item.day}</Text>
//     </View>

//   );
// };

//RADIO USANDO A BIBLIOTECA DE RADIOBUTTONRN import RadioButtonRN from 'radio-buttons-react-native';
// <ScrollView
//   horizontal={true}
//   bounces={false}
//   showsHorizontalScrollIndicator={false}
// >
//   <RadioButtonRN
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingHorizontal: 5,
//     }}
//     data={data}
//     selectedBtn={(item) => [
//       setChecked(item.label),
//       getRate(item.label, item.value),
//       console.log(item),
//     ]}
//     icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
//   />
// </ScrollView>

// const data = [
//   { label: 'Saturday' },
//   { label: 'Sunday' },
//   { label: 'Week Day' },
//   { label: 'Weekend' },
// ];

//ESSE ERA DO CUSTOM RADIO
// {options.map((opt, index) => (
//   <TouchableOpacity
//     onPress={() => onChangeSelect(opt, index)}
//     style={styles.container}
//     key={index}
//   >
//     <View style={styles.outlinedCircle}>
//       {selected === index && <View style={styles.innerCircle} />}
//     </View>
//     <Text
//       style={[
//         styles.txtRadio,
//         { color: selected === index ? '#444' : '#777' },
//       ]}
//     >
//       {opt}
//     </Text>
//   </TouchableOpacity>
// ))}
