import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import axios from 'axios';

const ForgotPassword = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        <Icon name="logo-octocat" size={100} color={Colors.netflixRed} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="Email"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate('Login');
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },

  input: {
    margin: 10,
    padding: 10,
    width: 340,
    borderBottomColor: Colors.netflixRed,
    borderBottomWidth: 1,
    fontSize: 16,
    color: Colors.netflixRed,
  },

  inputContainer: {
    alignSelf: 'center',
  },

  logo: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: '8%',
  },

  buttonContainer: {
    marginTop: '12%',
    backgroundColor: Colors.netflixRed,
    paddingHorizontal: 40,
    paddingVertical: 8,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.netflixRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPassword;
