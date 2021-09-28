import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Rates from '../Screens/Rates/Rates';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rates"
        component={Rates}
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
