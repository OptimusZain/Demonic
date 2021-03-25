import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Server from '../constants/Server';
// import {RNCamera} from 'react-native-camera';
import * as Camera from 'react-native-image-picker';
import Icon from 'react-native-ionicons';
// import 'multer';

const SignUp = (props) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUser = async () => {
      await AsyncStorage.getItem('@Email').then((res) => {
        fetchProfile(res);
      });
    };
    getUser();
  }, []);

  const fetchProfile = (user) => {
    axios
      .get('http://' + Server.ip + '/user/' + user)
      .then((res) => {
        setUserInfo({
          id: res.data._id,
          email: res.data.Email,
          firstName: res.data.FirstName,
          lastName: res.data.LastName,
          uri: 'http://' + Server.ip + '/api/' + res.data.uri,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const fetchImage = (path) => {
    console.log('fetching Image', path);
    axios
      .get('http://' + Server.ip + '/api/' + path)
      .then(async (res) => {
        console.log('Received Image: ', res.request.responseURL);
        setUserInfo({...userInfo, uri: res.request.responseURL});
        await AsyncStorage.setItem('@profilePicture', res.request.responseURL);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const sendData = async (img) => {
    console.log(img);

    let photo = {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    };

    const data = new FormData();
    data.append('email', userInfo.email);
    data.append('image', photo);
    console.log(data);
    axios.post('http://' + Server.ip + '/img', data).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        const path = res.data.path;
        fetchImage(path);
      } else {
        console.log(res);
      }
    });
  };

  const takePicture = () => {
    Camera.launchCamera(
      {saveToPhotos: true, mediaType: 'photo', cameraType: 'front'},
      (res) => {
        if (res.didCancel === true) {
          console.log('Picture Cancelled');
        } else {
          console.log(res.uri);
          sendData(res);
        }
      },
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profileContent}>
        <View style={styles.imageContainer}>
          <Image
            source={
              userInfo.uri
                ? {uri: userInfo.uri}
                : require('../assets/default.png')
            }
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.profileName}>
          {userInfo.firstName} {userInfo.lastName}
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
          <Text style={styles.data}>{userInfo.email}</Text>
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
    marginTop: 10,
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
