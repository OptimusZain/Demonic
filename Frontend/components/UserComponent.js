import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../constants/Colors';

const UserComponent = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.optionsContainer}>
        <Text style={styles.option}> {props.option} </Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
          <Text style={styles.buttonText}> Delete </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    height: 80,
    justifyContent: 'flex-start',
    paddingLeft: 50,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  option: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue',
    height: 50,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    left: 160,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});

export default UserComponent;
