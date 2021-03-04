import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TextInput,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';

const MyLists = (props) => {
  const myRender = ({item}) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.uri}} style={styles.thumbnail} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{color: 'white', fontSize: 16}}> {item.name} </Text>
            <Text style={{color: 'white'}}> {item.artist} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.genreContainer}>
        <Text style={styles.genre}> {props.genre} </Text>
        <Text style={styles.underText}>{props.underGenre}</Text>
      </View>
      <FlatList
        horizontal={true}
        data={props.MusicList}
        keyExtractor={(item) => item.id}
        renderItem={myRender}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  listContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '40%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.primary,
  },

  listItem: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  thumbnail: {
    height: 120,
    width: 120,
    marginTop: 20,
  },
  textContainer: {
    width: '100%',
    height: '40%',
    marginTop: 4,
  },

  genreContainer: {
    // height: '30%',
    paddingBottom: 10,
    width: '100%',
    backgroundColor: Colors.accent,
  },

  genre: {
    marginTop: 15,
    marginLeft: 20,
    fontSize: 24,
    color: 'white',
  },
  underText: {
    marginTop: 10,
    marginLeft: 24,
    fontSize: 14,
    color: 'white',
  },
});

export default MyLists;
