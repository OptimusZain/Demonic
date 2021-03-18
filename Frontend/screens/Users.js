import React, {useState, useEffect} from 'react';
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
import UserComponent from '../components/UserComponent';
import axios from 'axios';
import Server from '../constants/Server';
import AsyncStorage from '@react-native-community/async-storage';
import UserModal from '../components/UserModal';

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState();

  const getToken = async () => {
    await AsyncStorage.getItem('@token').then((res) => {
      setToken(res);
    });
  };

  const getUsers = async () => {
    await axios.get('http://' + Server.ip + '/users').then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  let config = {
    headers: {'access-token': token},
  };

  const deleteHandler = (id) => {
    getToken();
    console.log('beginning to delete', id);
    axios
      .post('http://' + Server.ip + '/delete/' + id, null, config)
      .then((res) => {
        if (res) {
          console.log(res.data.value.Email, 'has been removed');
          getUsers();
        }
      });
  };

  return (
    <FlatList
      style={styles.screen}
      keyExtractor={(item) => item._id}
      data={users}
      renderItem={({item}) => {
        return (
          <UserComponent
            FirstName={item.FirstName}
            LastName={item.LastName}
            onPressButton={() =>
              deleteHandler(item._id, (err, res) => {
                if (err) console.log(err);
                else console.log(res);
              })
            }
            option={item.Email}
          />
        );
      }}></FlatList>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Users;
