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

const Users = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios.get('http://' + Server.ip + ':3000/users').then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteHandler = (id) => {
    console.log('beginning to delete');
    axios.post('http://' + Server.ip + ':3000/delete/' + id).then((res) => {
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
            onPressItem={() => deleteHandler(item._id)}
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
