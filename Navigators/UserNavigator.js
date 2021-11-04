import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CredentialsContext } from '../Shared/CredentialsContext';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import Main from './Main';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <Stack.Navigator initialRouteName="Login">
          {storedCredentials ? (
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </CredentialsContext.Consumer>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}

// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import Login from '../Screens/User/Login';
// import Register from '../Screens/User/Register';
// import Main from './Main';

// const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Login" component={Login} />
//       <Tab.Screen name="Register" component={Register} />
//     </Tab.Navigator>
//   );
// }

// export default function UserNavigator() {
//   return <MyTabs />;
// }
