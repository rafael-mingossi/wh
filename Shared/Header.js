import React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';

import Constant from 'expo-constants';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/clock_logo.png')}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constant.statusBarHeight,
    marginBottom: 10,
  },
});

export default Header;
