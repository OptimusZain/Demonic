import React from 'react';
import {View, StyleSheet} from 'react-native';
import SettingsOptions from '../components/SettingsOptions';

const Settings = (props) => {
  return (
    <View style={styles.screen}>
      <SettingsOptions option="Account" />
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
