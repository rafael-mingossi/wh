import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Invoices from '../Screens/Invoices/Invoices';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Invoices"
        component={Invoices}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function InvoiceNavigator() {
  return <MyStack />;
}
