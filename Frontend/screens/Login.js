import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
  const [secure, setSecure] = useState(true);
  const [height, setHeight] = useState(useWindowDimensions().height);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const eyeHandler = () => {
    setSecure(!secure);
  };

  const submitHandler = () => {
    axios
      .post('http://172.16.0.217:3000/login', {
        Email: email,
        Password: password,
      })
      .then(async (res) => {
        if (res.data.auth === true) {
          setVisible(false);
          // console.log(res);
          // await AsyncStorage.setItem('@token', res.data.token);
          await AsyncStorage.setItem('@Email', email);
          setEmail('');
          setPassword('');
          props.navigation.navigate('MainMenu');
        } else if (res.data.statusCode === 400) {
          setVisible(true);
        }
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.temp}></View>
      <View style={styles.rowTwo}>
        <View style={styles.bottomLeftCol}></View>
        <View style={styles.bottomRightCol}></View>
      </View>
      <View style={{...styles.rowOne, minHeight: height / 3 + 10}}></View>
      <View style={styles.logo}>
        <Icon name="logo-octocat" size={100} color={Colors.netflixRed} />
      </View>

      <View style={styles.inputContainer}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.netflixRed,
              fontWeight: 'bold',
            }}>
            Email
          </Text>
        </View>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(e) => setEmail(e)}
        />
        <View style={{alignSelf: 'flex-start', marginTop: 15}}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.netflixRed,
              fontWeight: 'bold',
            }}>
            Password
          </Text>
        </View>
        <TextInput
          value={password}
          secureTextEntry={secure}
          style={styles.input}
          onChangeText={(e) => setPassword(e)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.eye}
          onPress={eyeHandler}>
          <Icon
            name={secure ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.netflixRed}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props.navigation.navigate('ForgotPassword');
        }}
        style={{alignSelf: 'flex-end', bottom: '8%', right: '13%'}}>
        <Text
          style={{color: Colors.netflixRed, textDecorationLine: 'underline'}}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={submitHandler}
        style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={{color: 'white', fontSize: 15}}>Login</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flex: 1,
          alignItems: 'center',
          // backgroundColor: 'blue',
          maxHeight: 28,
          minWidth: 235,
          marginBottom: 50,
        }}
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}>
        <Text
          style={{
            fontSize: 15,
            textDecorationLine: 'underline',
            color: Colors.netflixRed,
          }}>
          Don't have an account ? Sign Up
        </Text>
      </TouchableOpacity>
      <View style={styles.errorContainer}>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={1500}>
          <Text>Email or Password is incorrect</Text>
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowOne: {
    top: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.netflixRed,
    borderBottomRightRadius: 200,
    borderBottomWidth: 0,
    borderBottomColor: Colors.netflixRed,
  },
  temp: {
    flex: 2,
    paddingTop: 50,
    width: '100%',
    backgroundColor: Colors.netflixRed,
    borderBottomRightRadius: 200,
    borderBottomWidth: 0,
    borderBottomColor: Colors.netflixRed,
  },

  bottomRightCol: {
    right: 200,
    width: '80%',
    marginTop: '4%',
    backgroundColor: 'white',
    borderTopLeftRadius: 500,
    borderTopWidth: 0,
  },

  bottomLeftCol: {
    width: '70%',
    maxHeight: '80%',
    backgroundColor: Colors.netflixRed,
    borderWidth: 0,
  },

  logo: {
    position: 'absolute',
    bottom: '60%',
    paddingHorizontal: 11,
    borderWidth: 10,
    borderColor: Colors.netflixRed,
    backgroundColor: 'white',
    borderRadius: 200,
  },

  rowTwo: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    maxHeight: 190,
    borderTopWidth: 0,
  },

  inputContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'center',
    bottom: '13%',
  },

  input: {
    paddingVertical: 5,
    width: 300,
    borderBottomWidth: 2,
    borderBottomColor: Colors.netflixRed,
  },

  buttonContainer: {
    flex: 1,
    position: 'relative',
    marginTop: '1%',
    width: '80%',
    maxHeight: '4.7%',
    // backgroundColor: 'blue',
    marginBottom: 80,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.netflixRed,
    borderRadius: 10,
  },

  eye: {
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 100,
  },

  errorContainer: {
    alignItems: 'center',
  },
});

export default Login;
