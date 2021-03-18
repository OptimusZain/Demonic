import React, {useState} from 'react';
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
import {Snackbar} from 'react-native-paper';
import Server from '../constants/Server';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [secureOne, setSecureOne] = useState(true);
  const [secureTwo, setSecureTwo] = useState(true);
  const [visible, setVisible] = useState(false);
  const [emptyVisible, setEmptyVisible] = useState(false);

  const handleData = () => {
    setVisible(false);
    setEmptyVisible(false);
    console.log('Profile Created');

    axios
      .post('http://' + Server.ip + '/register', {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Role: 'Basic',
      })
      .then(function (response) {
        props.navigation.popToTop();
      })
      .catch(function (err) {
        if (err) console.log(err);
      });
  };

  const eyeHandlerOne = () => {
    setSecureOne(!secureOne);
  };

  const eyeHandlerTwo = () => {
    setSecureTwo(!secureTwo);
  };

  const permission = () => {
    if (firstName && lastName && email && password && rePassword) {
      setEmptyVisible(false);
      setVisible(false);
      return true;
    } else {
      setVisible(false);
      setEmptyVisible(true);
      return false;
    }
  };

  const verifyPassword = () => {
    if (password === rePassword) {
      setVisible(false);
      setEmptyVisible(false);
      return true;
    } else {
      setEmptyVisible(false);
      setVisible(true);
      return false;
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        <Icon name="logo-octocat" size={100} color={Colors.netflixRed} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="words"
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="First Name"
          onChangeText={(e) => {
            setFirstName(e);
          }}
        />
        <TextInput
          autoCapitalize="words"
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="Last Name"
          onChangeText={(e) => {
            setLastName(e);
          }}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          secureTextEntry={secureOne}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="Password"
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.eyeOne}
          onPress={eyeHandlerOne}>
          <Icon
            name={secureOne ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.netflixRed}
          />
        </TouchableOpacity>
        <TextInput
          secureTextEntry={secureTwo}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={Colors.netflixRed}
          placeholder="Re-Enter Password"
          onChangeText={(e) => {
            setRePassword(e);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.eyeTwo}
          onPress={eyeHandlerTwo}>
          <Icon
            name={secureTwo ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.netflixRed}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonContainer}
        onPress={() => {
          verifyPassword() && permission() ? handleData() : {};
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.errorContainer}>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={1500}>
          <Text>Password does not match</Text>
        </Snackbar>
        <Snackbar
          visible={emptyVisible}
          onDismiss={() => setEmptyVisible(false)}
          duration={1500}>
          <Text>Fields cannot be left empty</Text>
        </Snackbar>
      </View>
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
    marginTop: 100,
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
  eyeOne: {
    padding: 5,
    position: 'absolute',
    right: 20,
    bottom: 85,
  },
  eyeTwo: {
    padding: 5,
    position: 'absolute',
    right: 20,
    bottom: 13,
  },
  errorContainer: {
    flex: 1,
  },
});

export default SignUp;
