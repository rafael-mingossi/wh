import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import EasyButton from '../../Shared/EasyButton';

import axios from 'axios';
import baseURL from '../../assets/baseURL';

import moment from 'moment';
import { backgroundColor, borderBottom, style } from 'styled-system';

const Item = ({ ...props }) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.day}</Text>
      <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </EasyButton>
    </View>
  );
};

const Dashboard = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRender, setIsRender] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const ratesReg = useSelector((state) => {
    return state.rateR;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    //get Rates
    axios
      .get(`${baseURL}rates`)
      .then((res) => {
        setRates(res.data);
        dispatch({ type: 'ADD_RATE', payload: res.data });

        //console.log(res);
      })
      .catch((error) => alert('Error to load rates'));

    return () => {
      setRates();
    };
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`${baseURL}rates/${id}`)
      .then((res) => {
        const newRates = rates.filter((item) => item.id !== id);
        setRates(newRates);
        setIsRender(true);
      })
      .catch((error) => alert('Error to delete'));
  };

  const event = new Date();

  //console.log(event.toISOString().split('T')[0]);

  return (
    <View>
      <Text style={{ marginTop: 50 }}>DASHBOARD</Text>

      <FlatList
        data={ratesReg}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} delete={deleteCategory} />
        )}
        keyExtractor={(item) => item._id}
        extraData={isRender}
      />
    </View>
  );
};

export default Dashboard;

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
