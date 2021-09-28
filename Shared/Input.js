import React from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';

var { height, width } = Dimensions.get('window');

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      ></TextInput>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: width - 80,
    height: 40,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
});
