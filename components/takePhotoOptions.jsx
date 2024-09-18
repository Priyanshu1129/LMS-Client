import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@mui/material';
import { Text } from 'react-native';

const TakePhotoOptions = ({ visible, onClose, onCameraPress, onGalleryPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Title style={styles.title}>Choose Photo from</Title>
          <View style={styles.buttonContainer}>
            <Button
              icon={() => <AntDesign name="camerao" size={24} color="white" />}
              mode="contained"
              onPress={onCameraPress}
              style={styles.button}
            >
              Camera
            </Button>
            <Button
              icon={() => <AntDesign name="picture" size={24} color="white" />}
              mode="contained"
              onPress={onGalleryPress}
              style={styles.button}
            >
              Gallery
            </Button>
            <Button onPress={onClose} style={[styles.button, styles.cancelButton ]} >
              <Text style={{colors : "white"}}>Cancel</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    padding : 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius : 4
  },
  cancelButton: {
    backgroundColor: '#F87171',
  },
});

export default TakePhotoOptions;
