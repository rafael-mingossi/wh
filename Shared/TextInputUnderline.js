import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const TextInputUnderline = (props) => {
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
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      ></TextInput>
    </View>
  );
};

export default TextInputUnderline;

const styles = StyleSheet.create({
  inputFocused: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderColor: '#e3e324',
    width: '50%',
    height: '25%',
  },
  inputNotFocused: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#5c4b4d',
    width: '50%',
    height: '25%',
  },
});
