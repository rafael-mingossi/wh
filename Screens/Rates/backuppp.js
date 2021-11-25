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

//controlls the TIME inputs
// useEffect(() => {
//   const start = initHours + ':' + initMinutes;
//   const finish = finishHours + ':' + finishMinutes;

//   const startDecimal = initHours + '.' + initMinutes;
//   const finishDecimal = finishHours + '.' + finishMinutes;
//   const hoursNotFormatted = finishDecimal - startDecimal;

//   if (finishDecimal < startDecimal) {
//     Alert.alert('Start time cannot be less than Finish time!');
//     setStartTime('');
//     setFinishTime('');
//     setTotalHours('');
//     setTotalAmount('');
//   } else if (startDecimal < finishDecimal) {
//     setStartTime(start);
//     setFinishTime(finish);
//     setTotalHours(hoursNotFormatted.toFixed(2).toString());

//     const totalAmounts = rate * totalHours;
//     setTotalAmount(totalAmounts.toFixed(2).toString());
//   }
// }, [initHours, initMinutes, finishHours, finishMinutes, totalHours, rateDay]);

// return (
//   <TouchableOpacity onPress={() => setModalOpen(true)}>
//     <View>
//       <Text style={styles.textStyle}>{value}</Text>
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalOpen}
//         supportedOrientations={['portrait']}
//         onRequestClose={() => setModalOpen(false)}
//       >
//         <View style={{ flex: 1 }}>
//           {/* This will close the modal clicking out of it */}
//           <TouchableOpacity
//             onPress={() => setModalOpen(false)}
//             style={{ flex: 1 }}
//             activeOpacity={1}
//             visible={modalOpen}
//           >
//             <TouchableHighlight
//               underlayColor={'#FFFFFF'}
//               style={{
//                 flex: 1,
//               }}
//             >
//               <View style={styles.touchableOp}>
//                 <TouchableOpacity
//                   onPress={() => setModalOpen(false)}
//                   underlayColor={'transparent'}
//                 >
//                   <Text
//                     style={{
//                       fontWeight: 'bold',
//                       marginLeft: 10,
//                       fontSize: 18,
//                     }}
//                   >
//                     Close
//                   </Text>
//                 </TouchableOpacity>
//                 <View>
//                   <Picker
//                     selectedValue={value}
//                     style={{ height: 50, width: '100%' }}
//                     onValueChange={(itemValue, itemIndex) =>
//                       setValue(itemValue)
//                     }
//                   >
//                     {pickerData(items)}
//                   </Picker>
//                 </View>
//               </View>
//             </TouchableHighlight>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   </TouchableOpacity>
// );
// };

// import React, { useRef, useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Animated } from 'react-native';

// const Progress = ({ step, steps, height }) => {
//   const [width, setWidth] = useState(0);
//   const animatedValue = useRef(new Animated.Value(-1000)).current;
//   const reactive = useRef(new Animated.Value(-1000)).current;

//   useEffect(() => {
//     Animated.timing(animatedValue, {
//       toValue: reactive,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   useEffect(() => {
//     reactive.setValue(-width + (width * step) / steps);
//   }, [step, width]);

//   return (
//     <>
//       <Text>
//         {step}/{steps}
//       </Text>
//       <View
//         onLayout={(e) => {
//           const newWidth = e.nativeEvent.layout.width;
//           setWidth(newWidth);
//         }}
//         style={{
//           height,
//           backgroundColor: 'black',
//           borderRadius: height,
//           overflow: 'hidden',
//         }}
//       >
//         <Animated.View
//           style={{
//             height,
//             width: '100%',
//             backgroundColor: '#ffcc00',
//             borderRadius: height,
//             overflow: 'hidden',
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             transform: [
//               {
//                 translateX: animatedValue,
//               },
//             ],
//           }}
//         />
//       </View>
//     </>
//   );
// };

// const Chart = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((index + 1) % (10 + 1));
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [index]);

//   return (
//     <View style={styles.chart}>
//       <Progress step={8} steps={10} height={20} />
//     </View>
//   );
// };

// export default Chart;

// const styles = StyleSheet.create({
//   chart: {
//     justifyContent: 'center',
//     padding: 20,
//   },
// });

// useEffect(() => {
//   dispatch(getTokens());
// }, []);

// useFocusEffect(
//   useCallback(() => {
//     if (
//       context.stateUser.isAuthenticated === false ||
//       context.stateUser.isAuthenticated === null
//     ) {
//       navigation.navigate('Login');
//     }

//     const getToken = async () => {
//       try {
//         await AsyncStorage.getItem('jwt')
//           .then((res) => {
//             if (loadingAuth) {
//               setToken(res);
//               //console.log(res);
//               axios
//                 .get(`${baseURL}users/${context.stateUser.user.userId}`, {
//                   headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${res}`,
//                   },
//                 })
//                 .then((user) => setUserName(user.data))
//                 .catch((error) => console.log(error));
//             }
//           })
//           .catch((error) => console.log(error));
//       } catch (e) {
//         console.log(`tryCatch Token: ${e}`);
//       }
//     };

//     getToken();

//     return () => {
//       setUserName();
//       setToken();
//       setLoadingAuth(false);
//     };
//   }, [context.stateUser.isAuthenticated])
// );

// useEffect(() => {
//   navigation.addListener('focus', async () => {
//     try {
//       await axios
//         .get(`${baseURL}invoices/lastinvoice`)
//         .then((res) => {
//           if (isMounted.current) {
//             setLastInvoices(res.data);
//           }
//         })
//         .catch((error) => console.log(`Load Invoices: ${error}`));

//       //get Last Input
//       await axios
//         .get(`${baseURL}adds/lastinput`)
//         .then((res) => {
//           if (isMounted.current) {
//             setLastInput(res.data);
//           }
//         })
//         .catch((error) => console.log(`Load Inputs: ${error}`));
//       //setLoadingInvoices(false);
//     } catch (e) {
//       console.log(`tryCatch InputInvoice: ${e}`);
//     }

//     return () => {
//       setLastInvoices([]);
//       setLastInput([]);
//     };
//   });
// }, [navigation]);

// useEffect(() => {
//   navigation.addListener('focus', async () => {
//     try {
//       //get Inputs
//       await axios
//         .get(`${baseURL}adds`)
//         .then((res) => {
//           if (isMounted.current) {
//             const sundayValues = res.data
//               .filter((filt) => filt.rateDay === 'Sunday')
//               .map((el) => el.totalAmount);
//             setInputsSunday(sundayValues.reduce((a, b) => a + b, 0));

//             const saturdayValues = res.data
//               .filter((filt) => filt.rateDay === 'Saturday')
//               .map((el) => el.totalAmount);
//             setInputsSaturday(saturdayValues.reduce((a, b) => a + b, 0));

//             const weekdayValues = res.data
//               .filter((filt) => filt.rateDay === 'Weekday')
//               .map((el) => el.totalAmount);
//             setInputsWeekDay(weekdayValues.reduce((a, b) => a + b, 0));

//             const publicHolidayValues = res.data
//               .filter((filt) => filt.rateDay === 'Public Holiday')
//               .map((el) => el.totalAmount);
//             setInputsPublicHoliday(
//               publicHolidayValues.reduce((a, b) => a + b, 0)
//             );
//           }
//         })
//         .catch((error) => alert('Error to load chart details'));
//     } catch (e) {
//       console.log(`tryCatch Chart: ${e}`);
//     }

//     return () => {
//       setInputsSunday();
//       setInputsSaturday();
//       setInputsWeekDay();
//       setInputsPublicHoliday();
//     };
//   });
// }, [navigation]);

//>>>>>>>>>>>>>>>>>>ANTES DO REDUCER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// import React, { useEffect, useState, useContext, useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Modal,
//   Platform,
//   FlatList,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Toast from 'react-native-toast-message';

// import { CredentialsContext } from '../../Shared/CredentialsContext';

// import { useSelector, useDispatch } from 'react-redux';

// import EasyButton from '../../Shared/EasyButton';
// import RatesItem from './RatesItem';

// import axios from 'axios';
// import baseURL from '../../assets/baseURL';

// var { width } = Dimensions.get('window');

// export default function Rates() {
//   const [day, setDay] = useState('Saturday');
//   const [value, setValue] = useState('');
//   const [rates, setRates] = useState();

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isRender, setIsRender] = useState(false);
//   const [requestData, setRequestData] = useState(new Date());

//   const dispatch = useDispatch();

//   const ratesReg = useSelector((state) => {
//     return state.rateR;
//   });

//   //console.log(rates);

//   //context
//   const { storedCredentials, setStoredCredentials } =
//     useContext(CredentialsContext);
//   const { token, userId } = storedCredentials;
//   //console.log(rates);

//   const days = [
//     { name: 'Saturday', id: '1' },
//     { name: 'Sunday', id: '2' },
//     { name: 'Public Holiday', id: '3' },
//     { name: 'Weekday', id: '4' },
//   ];

//   useEffect(() => {
//     try {
//       axios
//         .get(`${baseURL}rates`)
//         .then((res) => {
//           if (userId) {
//             const data = res.data;

//             //filter by current user
//             const userInputs = data.filter(
//               (invoice) => invoice.user === userId
//             );
//             setRates(userInputs);
//           }
//         })
//         .catch((error) => console.log(`Error loading rates: ${error}`));
//     } catch (err) {
//       console.log(err);
//     }

//     return () => {
//       setRates();
//     };
//   }, [requestData]);

//   const handleAddRate = () => {
//     if (day === '' || value === '') {
//       alert('Day or Value cannot be empty');
//     } else {
//       let ratess = {
//         day: day,
//         value: value,
//         user: userId,
//       };

//       const validToken = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       axios
//         .post(`${baseURL}rates`, ratess, validToken)
//         .then((res) => [
//           setRates([...rates, res.data]),
//           Toast.show({
//             topOffset: 60,
//             type: 'success',
//             text1: 'Rate added',
//             text2: '',
//           }),
//           dispatch({ type: 'ADD_RATE', payload: [...rates, res.data] }),
//         ])
//         .catch((error) => {
//           Toast.show({
//             topOffset: 60,
//             type: 'error',
//             text1: 'This rate already exists',
//             text2: 'Delete before adding a new one',
//           });
//         });
//     }
//   };

//   const handleRemoveRate = (id) => {
//     const validToken = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     axios
//       .delete(`${baseURL}rates/${id}`, validToken)
//       .then((res) => {
//         //console.log(res.data.success);
//         const newRates = rates.filter((item) => item.id !== id);
//         //const newRates = rates.splice(index, 1);
//         dispatch({ type: 'ADD_RATE', payload: newRates });
//         setRates(newRates);
//         setRequestData(new Date());
//         setIsRender(true);
//       })
//       .catch((error) => {
//         Toast.show({
//           topOffset: 60,
//           type: 'error',
//           text1: 'Error to delete rate',
//           text2: '',
//         });
//       });
//   };

//   return (
//     <TouchableWithoutFeedback
//       onPress={() => {
//         Keyboard.dismiss(0);
//       }}
//       accessible={false}
//     >
//       <View style={{ padding: 10, marginTop: 80 }}>
//         <View style={{ alignItems: 'center', padding: 10 }}>
//           <Text>Select your Rate</Text>
//         </View>
//         <View>
//           {Platform.OS === 'android' ? (
//             <Picker
//               mode="dropdown"
//               iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
//               placeholder=". . ."
//               placeholderStyle={{ color: '#007aff' }}
//               placeholderIconColor="#007aff"
//               style={{ width: width / 1.6, height: 40, alignSelf: 'center' }}
//               selectedValue={day}
//               onValueChange={(e) => setDay(e)}
//             >
//               {days.map((c) => {
//                 return <Picker.Item key={c.id} label={c.name} value={c.name} />;
//               })}
//             </Picker>
//           ) : (
//             <TouchableOpacity
//               style={styles.iosView}
//               onPress={() => setModalOpen(true)}
//             >
//               <Text>{day}</Text>
//               <Modal
//                 transparent={true}
//                 animationType="slide"
//                 visible={modalOpen}
//                 onRequestClose={() => setModalOpen(false)}
//               >
//                 <View style={{ flex: 1 }}>
//                   <View style={styles.touchableOp}>
//                     <TouchableOpacity onPress={() => setModalOpen(false)}>
//                       <Text
//                         style={{
//                           fontWeight: 'bold',
//                           marginLeft: 10,
//                           fontSize: 18,
//                         }}
//                       >
//                         Close
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.opacityModalView}>
//                       <Picker
//                         selectedValue={day}
//                         style={{ height: 50, width: '100%' }}
//                         onValueChange={(itemValue, itemIndex) =>
//                           setDay(itemValue)
//                         }
//                       >
//                         {days.map((val) => {
//                           return (
//                             <Picker.Item
//                               label={val.name}
//                               value={val.name}
//                               key={val.id}
//                             />
//                           );
//                         })}
//                       </Picker>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </Modal>
//             </TouchableOpacity>
//           )}
//         </View>
//         <View
//           style={{
//             marginBottom: 15,
//             alignSelf: 'center',
//             flexDirection: 'row',
//           }}
//         >
//           <TextInput
//             style={styles.input}
//             placeholder={'Value'}
//             name={'value'}
//             keyboardType={'numeric'}
//             onChangeText={(text) => setValue(text)}
//           />
//           <EasyButton secondary medium onPress={() => handleAddRate()}>
//             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
//               Add
//             </Text>
//           </EasyButton>
//         </View>

//         {rates ? (
//           <FlatList
//             data={rates}
//             renderItem={({ item, index }) => (
//               <RatesItem
//                 day={item.day}
//                 value={item.value}
//                 id={item._id}
//                 index={index}
//                 delete={handleRemoveRate}
//               />
//             )}
//             keyExtractor={(item) => item._id}
//             extraData={isRender}
//           />
//         ) : (
//           <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
//             Please, add your rates to start!
//           </Text>
//         )}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }
