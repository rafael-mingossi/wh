import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';

//Stacks
import HomeNavigator from './HomeNavigator';
import RateNavigator from './RateNavigator';
import AddNavigator from './AddNavigator';
import InvoiceNavigator from './InvoiceNavigator';

//import FavouriteIcon from '../Shared/FavouriteIcon';

//import { logoutUser } from "../Context/actions/Auth.actions";
//import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  //   const context = useContext(AuthGlobal);

  //   useEffect(() => {
  //     const backAction = () => {
  //       BackHandler.exitApp();
  //       logoutUser(context.dispatch);
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       backAction
  //     );

  //     return () => backHandler.remove();
  //   }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={InvoiceNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-invoice-dollar" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rate"
        component={RateNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
