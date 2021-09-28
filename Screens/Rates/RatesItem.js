import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EasyButton from '../../Shared/EasyButton';

const RatesItem = (props) => {
  //const { item, day } = props;
  //console.log(item.item.day);
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>Day: </Text>
        <Text>{props.day}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>Value: </Text>
        <Text>${props.value}</Text>
      </View>
      <View>
        <EasyButton danger small onPress={() => props.delete(props.id)}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            X
          </Text>
        </EasyButton>
      </View>
    </View>
  );
};

export default RatesItem;

const styles = StyleSheet.create({
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});
