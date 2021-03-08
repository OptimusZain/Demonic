import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../constants/Colors';

const UserComponent = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPressItem} activeOpacity={0.5}>
        <View style={styles.optionsContainer}>
          <Text style={styles.option}> {props.option} </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onPressButton}
        activeOpacity={0.7}
        style={styles.button}>
        <Icon name="trash" color={Colors.netflixBlack}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    height: 80,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  option: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    right: 45,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});

export default UserComponent;
