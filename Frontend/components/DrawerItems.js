import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../constants/Colors';

const DrawerItems = (props) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={props.onPress} style={styles.DrawerOptions}>
        <Icon
          name={props.Icon}
          style={{
            color: Colors.primary,
            bottom: 6,
            marginLeft: 25,
            marginRight: 10,
          }}
        />
        <Text style={{fontSize: 17}}> {props.label} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {},

  DrawerOptions: {
    flexDirection: 'row',
    // paddingLeft: 4,
    paddingVertical: 20,
  },
});

export default DrawerItems;
