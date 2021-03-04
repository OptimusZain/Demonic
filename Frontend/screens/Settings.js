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
import SettingsOptions from '../components/SettingsOptions';

const Settings = (props) => {
  return (
    <View style={styles.screen}>
      <SettingsOptions icon= option="Account" />
      <SettingsOptions option="Notifications" />
      <SettingsOptions option="Privacy" />
      <SettingsOptions option="About" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Settings;
