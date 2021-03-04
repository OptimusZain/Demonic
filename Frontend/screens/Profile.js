import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = (props) => {
  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();

  const getUser = async () => {
    await AsyncStorage.getItem('@Email').then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    getUser();

    if (user !== undefined) {
      axios
        .get('http://172.16.0.217:3000/' + user)
        .then((res) => {
          setUserID(res.data._id);
          setEmail(res.data.Email);
          setFirstName(res.data.FirstName);
          setLastName(res.data.LastName);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  }, [user]);

  return (
    <View style={styles.screen}>
      <View style={styles.profileContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/file.png')}
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.profileName}>
          {' '}
          {firstName} {lastName}{' '}
        </Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 17}}> Email: </Text>
          <Text style={styles.data}>{email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 17}}> Phone: </Text>
          <Text style={styles.data}> 03xx-xxxxxx-x </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 17}}> Birthday: </Text>
          <Text style={styles.data}> 12/12/69 </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileContent: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    borderWidth: 1,
    marginTop: '5%',
    backgroundColor: 'white',
    borderRadius: 200,
    height: 156,
    width: 156,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePicture: {
    borderRadius: 200,
    height: 150,
    width: 150,
  },

  profileName: {
    fontSize: 20,
    color: 'white',
  },

  mainContent: {
    flex: 1.5,
    width: '100%',
    height: '100%',
  },

  textContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    marginHorizontal: 30,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },

  data: {
    marginLeft: '5%',
    fontSize: 18,
  },
});

export default SignUp;
