import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import MusicList from '../components/MusicItems';
import MyLists from '../components/List';

const Library = (props) => {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          minHeight: useWindowDimensions().height * 1.1,
        }}>
        <MyLists
          MusicList={MusicList}
          genre="Pop Music"
          underGenre="The Most Played Pop Hits on this app this week"
        />
        <MyLists
          MusicList={MusicList}
          genre="Pop Music"
          underGenre="The Most Played Pop Hits on this app this week"
        />

        <MyLists
          MusicList={MusicList}
          genre="Pop Music"
          underGenre="The Most Played Pop Hits on this app this week"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});

export default Library;
