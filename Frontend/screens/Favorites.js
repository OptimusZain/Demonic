import React from 'react';
import {View, StyleSheet, FlatList, Image, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';

const Favorites = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Favorites Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Favorites;
