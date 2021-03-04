import React from 'react';
import {View, StyleSheet, FlatList, Image, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';

const Search = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.primary}
          style={styles.searchBar}></TextInput>
      </View>
      <Icon name="search" color={Colors.primary} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  searchBar: {
    flex: 1,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 12,
    paddingLeft: 40,
    maxWidth: '78%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: 32,
    left: 55,
  },
});

export default Search;
