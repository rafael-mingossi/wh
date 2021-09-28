import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Button, Card } from 'react-native-paper';

const InputsListItem = (props) => {
  return (
    <Card style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View>
          <View style={styles.viewCard}>
            <Text>{`Date: ${props.date}`}</Text>
            <Text>{`Rate: ${props.day}`}</Text>
          </View>
          <View style={styles.viewCard}>
            <Text>{`Start: ${props.start}`}</Text>
            <Text>{`Finish: ${props.finish}`}</Text>
          </View>
          <View style={styles.viewCard}>
            <Text>{`Hours: ${props.hours}`}</Text>
            <Text>{`Amount: $ ${props.amount}`}</Text>
          </View>
          <View style={styles.viewCard}>
            <Text>{`Child: ${props.child}`}</Text>
            <Text>{`Location: ${props.location}`}</Text>
          </View>
        </View>
        <View style={{ marginRight: 8, padding: 5 }}>
          <TouchableOpacity onPress={() => props.delete(props.id)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default InputsListItem;

const styles = StyleSheet.create({
  container: {
    width: '97%',
    padding: 7,
    marginBottom: 8,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewCard: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    padding: 5,
    width: '90%',
  },
});
