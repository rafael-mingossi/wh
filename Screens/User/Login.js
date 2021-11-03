import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

//Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate('Main');
    }
  }, [context.stateUser.isAuthenticated]);

  //console.log(tokens);

  const handleSubmit = () => {
    const userLogin = {
      email,
      password,
    };

    if (email === '' || password === '') {
      alert('Please fill in your credentials');
    } else {
      [loginUser(userLogin, context.dispatch), navigation.navigate('Main')];
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={150}
      enableOnAndroid={true}
    >
      <View style={styles.viewMain}>
        <View style={styles.viewLoginPassword}>
          <TextInput
            name={'email'}
            placeholder="Email"
            style={
              isFocusedLogin ? styles.inputFocused : styles.inputNotFocused
            }
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsFocusedLogin(true)}
            onBlur={() => setIsFocusedLogin(false)}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            name={'password'}
            placeholder="Password"
            style={
              isFocusedPassword ? styles.inputFocused : styles.inputNotFocused
            }
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ fontSize: 15 }}>
              Not register yet? Click here to Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.viewBtnLogin}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.txtBtnLogin}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewMain: {
    width: '98%',
    marginTop: 100,
    alignItems: 'center',
  },
  viewLoginPassword: {
    padding: 30,
    width: '100%',
    alignItems: 'center',
  },
  inputFocused: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderColor: '#e3e324',
    width: '90%',
    height: 50,
    fontSize: 16,
    marginTop: 30,
  },
  inputNotFocused: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#5c4b4d',
    width: '90%',
    height: 50,
    fontSize: 16,
    marginTop: 30,
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
