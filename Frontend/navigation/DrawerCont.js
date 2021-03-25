import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import DrawerItems from '../components/DrawerItems';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Server from '../constants/Server';

const DrawerCont = (props) => {
  const [admin, setAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fetchUser = (user) => {
    if (user !== undefined) {
      axios.get('http://' + Server.ip + '/user/' + user).then(async (res) => {
        console.log(user);

        try {
          setUserInfo({
            id: res.data._id,
            email: res.data.Email,
            firstName: res.data.FirstName,
            lastName: res.data.LastName,
            role: res.data.Role,
            uri: 'http://' + Server.ip + '/api/' + res.data.uri,
          });

          if (res.data.Role === 'Admin') {
            setAdmin(true);
          }
        } catch (err) {
          if (err) console.log(err);
        }
      });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      await AsyncStorage.getItem('@Email').then((res) => {
        fetchUser(res);
      });
    };
    getUser();
  }, []);

  // if (useIsDrawerOpen()) {
  //   async () =>
  //     await AsyncStorage.getItem('@profilePicture').then((res) => {
  //       setUserInfo({...userInfo, uri: res});
  //     });
  // }

  return (
    <View screen={styles.screen}>
      <View style={styles.titleContent}>
        <Image
          style={styles.Avatar}
          source={
            userInfo.uri
              ? {uri: userInfo.uri}
              : require('../assets/default.png')
          }></Image>
        <View style={styles.Caption}>
          <Text style={styles.captionUsername}>
            {userInfo.firstName} {userInfo.lastName}
          </Text>
          <Text style={styles.captionEmail}>{userInfo.email}</Text>
        </View>
      </View>
      <ScrollView style={styles.mainContent}>
        <DrawerItems
          Icon="home"
          label="Home"
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <DrawerItems
          Icon="person"
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        />
        <DrawerItems
          Icon="heart"
          label="My Favorites"
          onPress={() => {
            props.navigation.navigate('Favorites');
          }}
        />
        {admin && (
          <DrawerItems
            Icon="people"
            label="Users"
            onPress={() => {
              props.navigation.navigate('Users');
            }}
          />
        )}
        <DrawerItems
          Icon="settings"
          label="Settings"
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
      </ScrollView>
      <View
        style={{
          ...styles.footerContent,
          top: Dimensions.get('window').height,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.logout}
          onPress={() => {
            props.navigation.popToTop();
          }}>
          <Icon name="log-out" color={Colors.accent} />
          <Text style={{left: 8, fontSize: 17, color: Colors.accent}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},

  titleContent: {
    backgroundColor: Colors.accent,
    paddingBottom: 20,
  },

  Avatar: {
    width: 65,
    height: 65,
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 200,
    overflow: 'hidden',
  },
  Caption: {
    marginLeft: 24,
    maxWidth: 170,
  },

  captionUsername: {
    fontSize: 14,
    marginTop: 20,
    color: 'white',
  },

  captionEmail: {
    color: 'white',
    fontSize: 15,
  },

  mainContent: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  footerContent: {
    position: 'absolute',
  },
  logout: {
    flexDirection: 'row',
    left: '550%',
    bottom: '90%',
    alignItems: 'center',
  },
});

export default DrawerCont;
