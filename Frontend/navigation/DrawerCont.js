import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import DrawerItems from '../components/DrawerItems';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const DrawerCont = (props) => {
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
      axios.get('http://172.16.0.217:3000/' + user).then((res) => {
        console.log(user);
        try {
          setUserID(res.data._id);
          setEmail(res.data.Email);
          setFirstName(res.data.FirstName);
          setLastName(res.data.LastName);
        } catch (err) {
          if (err) console.log(err);
        }
      });
    }
  }, [user]);

  return (
    <View screen={styles.screen}>
      <View style={styles.titleContent}>
        <Image
          style={styles.Avatar}
          source={require('../assets/file.png')}></Image>
        <View style={styles.Caption}>
          <Text style={styles.captionUsername}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.captionEmail}>{email}</Text>
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
          <Icon name="log-out" color={Colors.primary} />
          <Text style={{left: 8, fontSize: 17, color: Colors.primary}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },

  titleContent: {
    backgroundColor: Colors.primary,
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
    color: 'grey',
  },

  captionEmail: {
    color: 'grey',
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
