import React from 'react';
import { Text, ScrollView, Dimensions, StyleSheet } from 'react-native';

var { height, width } = Dimensions.get('window');

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {/* this props will make possible to render other components as props */}
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
