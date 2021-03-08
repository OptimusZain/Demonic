import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Modal,
} from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../constants/Colors';

const UserModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibility}
      onRequestClose={props.modalControl}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.modalControl}
        style={styles.card}>
        <Text style={{fontSize: 17}}>First Name: {props.FirstName}</Text>
        <Text style={{fontSize: 17}}>Last Name: {props.LastName}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.accent,
    width: '80%',
    height: '20%',
    margin: 30,
    padding: 20,
  },
});

export default UserModal;
