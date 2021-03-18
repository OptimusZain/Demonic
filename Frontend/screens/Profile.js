import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Server from '../constants/Server';
import {RNCamera} from 'react-native-camera';
import * as Camera from 'react-native-image-picker';
import Icon from 'react-native-ionicons';

const SignUp = (props) => {
  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();
  const [uri, setURI] = useState();

  const getUser = async () => {
    await AsyncStorage.getItem('@Email').then((res) => {
      setUser(res);
    });
  };

  const takePicture = () => {
    Camera.launchCamera(
      {saveToPhotos: true, mediaType: 'photo', cameraType: 'front'},
      (res) => {
        setURI(res.uri);
        console.log(res);
      },
    );
  };

  useEffect(() => {
    getUser();

    if (user !== undefined) {
      axios
        .get('http://' + Server.ip + '/user/' + user)
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
            source={
              uri ? {uri: uri.toString()} : require('../assets/default.png')
            }
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.profileName}>
          {' '}
          {firstName} {lastName}{' '}
        </Text>
        <TouchableOpacity
          onPress={takePicture}
          activeOpacity={0.7}
          style={styles.iconContainer}>
          <Icon style={styles.cameraIcon} name="camera" color="white"></Icon>
        </TouchableOpacity>
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
    backgroundColor: Colors.accent,
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

  iconContainer: {
    position: 'absolute',
    padding: 5,
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    right: 80,
    bottom: 30,
  },
  cameraIcon: {
    position: 'relative',
  },
});

export default SignUp;
