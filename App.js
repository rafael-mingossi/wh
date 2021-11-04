import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

//Credentials Context
import { CredentialsContext } from './Shared/CredentialsContext';

//Screens
import Header from './Shared/Header';
import UserNavigator from './Navigators/UserNavigator';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('userCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((err) => console.log(err));
  };

  //controls the loading screen untill check credentials
  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <UserNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </CredentialsContext.Provider>
  );
}
