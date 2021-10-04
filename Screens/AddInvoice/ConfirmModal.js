import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';

var { height } = Dimensions.get('window');

const ConfirmModal = (props) => {
  const item = props.items;
  //console.log(item);

  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.modalOpen}
        supportedOrientations={['portrait']}
        onRequestClose={() => props.setModalOpen(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card style={styles.myCard}>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Rate Day:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.rateDay}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Date: </Text>
                <Text style={{ fontSize: 18 }}>{item.date}</Text>
              </View>

              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Total Hours:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.totalHours}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Comments:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.comments}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Child:{' '}
                </Text>
                <Text style={{ fontSize: 18 }}>{item.child}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Location:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.location}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Start Time:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.startTime}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Finish Time:
                </Text>
                <Text style={{ fontSize: 18 }}>{item.finishTime}</Text>
              </View>
              <View style={styles.viewDetails}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Total amount: $
                </Text>
                <Text style={{ fontSize: 18 }}>{item.totalAmount}</Text>
              </View>
            </Card>
            <View style={{ flexDirection: 'row' }}>
              <Button
                icon="content-save"
                mode="contained"
                style={{ width: 100, alignSelf: 'center', marginRight: 15 }}
                theme={{ colors: { primary: '#5c4b4d' } }}
                onPress={() => [
                  props.handleAddDay(),
                  setTimeout(() => {
                    props.setModalOpen(false);
                  }, 600),
                ]}
              >
                Done
              </Button>
              <Button
                icon="content-save"
                mode="contained"
                style={{ width: 110, alignSelf: 'center' }}
                theme={{ colors: { primary: '#5c4b4d' } }}
                onPress={() => props.setModalOpen(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
    padding: 15,
    backgroundColor: '#f0eeeb',
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,

    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    flex: 1,
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 1.5,
    width: '90%',
  },
  viewDetails: {
    flexDirection: 'row',
    padding: 5,
  },
});
