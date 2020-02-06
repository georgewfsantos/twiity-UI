import React, {useState, useEffect} from 'react';
import socket from 'socket.io-client';
import api from '../services/api';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

export default function Timeline() {
  const [tweets, setTweets] = useState([]);

  async function loadTweets() {
    const response = await api.get('/tweets');

    setTweets(response.data);
  }

  useEffect(() => {
    subscribeToEvents();
    loadTweets();
  }, []);

  function subscribeToEvents() {
    const io = socket('http://localhost:3333');

    io.on('tweet', data => {
      setTweets(prev => [data, ...prev]);
    });

    io.on('like', data => {
      setTweets(prev =>
        prev.map(tweet => (tweet._id === data._id ? data : tweet)),
      );
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={tweet => tweet._id}
        renderItem={({item}) => <Tweet tweet={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

Timeline.navigationOptions = ({navigation}) => ({
  title: 'Início',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('New')}>
      <Icon
        name="add-circle-outline"
        size={24}
        color="#4bb0ee"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginRight: 20}}
      />
    </TouchableOpacity>
  ),
});
