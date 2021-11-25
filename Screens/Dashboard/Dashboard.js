import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../Shared/CredentialsContext';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

import Chart from './Chart';

var { height, width } = Dimensions.get('window');

//function to fix 'Warning: Can't perform a React state update on an unmounted component.'
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}

const Dashboard = ({ navigation }) => {
  const isMounted = useIsMounted();

  const [lastInvoices, setLastInvoices] = useState([]);
  const [lastInput, setLastInput] = useState([]);
  const [inputsSunday, setInputsSunday] = useState();
  const [inputsSaturday, setInputsSaturday] = useState();
  const [inputsWeekDay, setInputsWeekDay] = useState();
  const [inputsPublicHoliday, setInputsPublicHoliday] = useState();

  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { firstName, token, userId } = storedCredentials;
  //console.log(lastInvoices);

  //Logout function
  const handleLogout = () => {
    AsyncStorage.removeItem('userCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        // let userIds = { userId: userId };

        // await axios
        //   .get(`${baseURL}invoices/lastinvoice`, userIds)
        //   .then((res) => {
        //     //console.log(res);
        //     if (isMounted.current) {
        //       // console.log(res);
        //       if (res) {
        //         setLastInvoices(res.data);
        //       }
        //     }
        //   })
        //   .catch((error) => console.log(`Load Invoices: ${error}`));

        await axios
          .get(`${baseURL}invoices/lastinvoice`)
          .then((res) => {
            if (isMounted.current) {
              const data = res.data;

              //filter by current user
              const userInvoices = data.filter(
                (invoice) => invoice.user === userId
              );

              //let lastInv = userInvoices[userInvoices.length - 1];
              let lastInv = userInvoices.slice(-1);
              if (lastInv) {
                //console.log(lastInv);
                setLastInvoices(lastInv);
              }
            }
          })
          .catch((error) => console.log(`Load Invoices: ${error}`));

        //get Last Input
        await axios
          .get(`${baseURL}adds/lastinput`)
          .then((res) => {
            if (isMounted.current) {
              const data = res.data;

              //filter by current user
              const userInputs = data.filter(
                (invoice) => invoice.user === userId
              );
              //console.log(userInputs[0]);
              setLastInput([userInputs[0]]);
            }
          })
          .catch((error) => console.log(`Load Inputs: ${error}`));
        //setLoadingInvoices(false);
      } catch (e) {
        console.log(`tryCatch InputInvoice: ${e}`);
      }

      return () => {
        setLastInvoices([]);
        setLastInput([]);
      };
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        //get Inputs
        await axios
          .get(`${baseURL}adds`)
          .then((res) => {
            if (isMounted.current) {
              const data = res.data;

              //filter by current user
              const graphInputs = data.filter(
                (invoice) => invoice.user === userId
              );

              const sundayValues = graphInputs
                .filter((filt) => filt.rateDay === 'Sunday')
                .map((el) => el.totalAmount);
              setInputsSunday(sundayValues.reduce((a, b) => a + b, 0));

              const saturdayValues = graphInputs
                .filter((filt) => filt.rateDay === 'Saturday')
                .map((el) => el.totalAmount);
              setInputsSaturday(saturdayValues.reduce((a, b) => a + b, 0));

              const weekdayValues = graphInputs
                .filter((filt) => filt.rateDay === 'Weekday')
                .map((el) => el.totalAmount);
              setInputsWeekDay(weekdayValues.reduce((a, b) => a + b, 0));

              const publicHolidayValues = graphInputs
                .filter((filt) => filt.rateDay === 'Public Holiday')
                .map((el) => el.totalAmount);
              setInputsPublicHoliday(
                publicHolidayValues.reduce((a, b) => a + b, 0)
              );
            }
          })
          .catch((error) => alert('Error to load chart details'));
      } catch (e) {
        console.log(`tryCatch Chart: ${e}`);
      }

      return () => {
        setInputsSunday();
        setInputsSaturday();
        setInputsWeekDay();
        setInputsPublicHoliday();
      };
    });
  }, [navigation]);

  return (
    <View style={{ backgroundColor: 'white', height: height }}>
      <View style={styles.viewBorderWhite}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          //contentContainerStyle={{ height: height }}
        >
          <View>
            <View style={styles.viewWelcome}>
              <Text style={styles.txtWelcome}>
                Hello {firstName ? firstName : null}
              </Text>
            </View>
            <View style={styles.rightYellowBar} />
            <View style={styles.leftYellowBar} />
          </View>
          <View style={styles.viewLastInvoice}>
            <Text style={styles.txtLastInvoice}>Last Invoice</Text>
            {lastInvoices.length == 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 25 }}>
                You have no Invoices created
              </Text>
            ) : (
              <>
                {lastInvoices.map((invoiceDetails) => {
                  var newDate = invoiceDetails.invoiceDate.split('T')[0];
                  var getDay = newDate.slice(8, 10);
                  var getMonth = newDate.slice(5, 7);
                  var getYear = newDate.slice(0, 4);

                  var newDateFormatted =
                    getDay + '-' + getMonth + '-' + getYear;
                  return (
                    <View
                      key={invoiceDetails._id}
                      style={styles.viewLastInvoiceDetails}
                    >
                      <Text>{`Number: ${invoiceDetails.invoiceNumber}`}</Text>
                      <Text>{`Amount: $${invoiceDetails.invoiceAmount}`}</Text>
                      <Text>{`Date: ${newDateFormatted}`}</Text>
                    </View>
                  );
                })}
              </>
            )}
          </View>
          <View style={styles.viewLastDay}>
            <Text style={styles.txtLastInvoice}>Last Input</Text>
            {lastInput.length == 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 30 }}>
                You have no Inputs added
              </Text>
            ) : (
              <>
                {lastInput.map((inputDetails) => {
                  if (inputDetails) {
                    return (
                      <View
                        key={inputDetails._id}
                        style={styles.viewLastInvoiceDetails}
                      >
                        <Text>{`Hours: ${inputDetails.totalHours}`}</Text>
                        <Text>{`Amount: $${inputDetails.totalAmount}`}</Text>
                        <Text>{`Date: ${inputDetails.date}`}</Text>
                        <Text>{`Child: ${inputDetails.child}`}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View key={Math.random()}>
                        <Text style={{ textAlign: 'center', marginTop: 30 }}>
                          You have no Inputs added
                        </Text>
                      </View>
                    );
                  }
                })}
              </>
            )}
          </View>
          <View
            style={{
              top: height / -1.25,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              height: 230,
              width: '90%',
              alignSelf: 'center',
            }}
          >
            <View>
              <Chart step={inputsSunday ? inputsSunday : '0'} label="Sunday" />
              <Chart
                step={inputsSaturday ? inputsSaturday : '0'}
                label="Saturday"
              />
              <Chart
                step={inputsWeekDay ? inputsWeekDay : '0'}
                label="Weekday"
              />
              <Chart
                step={inputsPublicHoliday ? inputsPublicHoliday : '0'}
                label="Public Holiday"
              />
            </View>
          </View>
          <Text
            style={{
              textAlign: 'right',
              padding: 5,

              top: height / -1.25,
            }}
          >
            Amount
          </Text>
          <View style={{ top: height / -1.25 }}>
            <TouchableOpacity
              style={styles.viewBtnLogin}
              onPress={() => handleLogout()}
            >
              <Text style={styles.txtBtnLogin}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  viewBorderWhite: {
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 20,
    height: height,
    backgroundColor: '#f2f2f2',
  },
  viewWelcome: {
    backgroundColor: '#ffcc00',
    borderRadius: 400,
    height: height / 2,
    width: width / 0.8,
    alignSelf: 'center',
    top: height / -2.5,
  },
  txtWelcome: {
    textAlign: 'center',
    fontSize: 25,
    position: 'absolute',
    top: height / 2.4,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  rightYellowBar: {
    //backgroundColor: 'red',
    width: 90,
    height: 90,
    top: height / -2.4,
    alignSelf: 'flex-end',
    borderLeftWidth: 4,
    borderColor: '#ffcc00',
  },
  leftYellowBar: {
    //backgroundColor: 'red',
    width: 90,
    height: 200,
    top: height / -1.8,
    alignSelf: 'flex-start',
    borderRightWidth: 4,
    borderColor: '#ffcc00',
  },
  viewLastInvoice: {
    backgroundColor: '#ffcc00',
    width: 140,
    height: 120,
    top: height / -1.4,
    right: width / 18,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  txtLastInvoice: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  viewLastDay: {
    backgroundColor: '#ffcc00',
    width: 140,
    height: 130,
    top: height / -1.2,
    left: width / -1.9,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  spinner: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLastInvoiceDetails: {
    alignItems: 'center',
    marginTop: 9,
  },
  viewBtnLogin: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    width: 120,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    justifyContent: 'center',
  },
  txtBtnLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
