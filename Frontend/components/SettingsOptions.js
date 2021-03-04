import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../constants/Colors';

const SettingsOptions = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.optionsContainer}>
        <Text style={styles.option}> {props.option} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 50,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  option: {
    color: 'black',
    fontSize: 18,
  },
});

export default SettingsOptions;
