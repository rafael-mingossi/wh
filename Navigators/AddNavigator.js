import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Add from '../Screens/AddInvoice/Add';
import InputsList from '../Screens/AddInvoice/InputsList';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InputsList"
        component={InputsList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RateNavigator() {
  return <MyStack />;
}
