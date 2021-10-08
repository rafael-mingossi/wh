import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Invoices from '../Screens/Invoices/Invoices';
import InvoiceDetails from '../Screens/Invoices/InvoiceDetails';

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
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          headerShown: false,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default function InvoiceNavigator() {
  return <MyStack />;
}
