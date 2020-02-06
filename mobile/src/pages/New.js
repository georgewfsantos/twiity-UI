import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function New({navigation}) {
  const [newTweet, setNewTweet] = useState('');

  async function handleTweet() {
    const content = newTweet;
    const author = await AsyncStorage.getItem('@Twitty:username');

    await api.post('tweets', {author, content});

    navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="close" size={20} color="#4BB0EE" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTweet} style={styles.button}>
          <Text style={styles.buttonText}>Tweetar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="O que está rolando"
        placeholderTextColor="#999"
        value={newTweet}
        onChangeText={setNewTweet}
        returnKeyType="send"
        onSubmitEditing={handleTweet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4BB0EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: '#333',
  },
});

New.navigationOptions = {
  headerShown: false,
};
