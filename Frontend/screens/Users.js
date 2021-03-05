import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import UserComponent from '../components/UserComponent';

const Users = (props) => {
  return (
    <View style={styles.screen}>
      <UserComponent option="User1" />
      <UserComponent option="User2" />
      <UserComponent option="User3" />
      <UserComponent option="User4" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Users;
