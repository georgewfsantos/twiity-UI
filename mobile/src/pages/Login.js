import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import logo from '../assets/logo.png';

// import { Container } from './styles';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');

  async function handleLogin() {
    if (!username) {
      return;
    }

    await AsyncStorage.setItem('@Twitty:username', username);

    navigation.navigate('Timeline');
  }

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('@Twitty:username');

      if (user) {
        navigation.navigate('App');
      }
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.content}>
        <Image style={styles.image} source={logo} />
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onSubmitEditing={handleLogin}
          returnKeyType="send"
          onChangeText={setUsername}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  image: {
    width: 100,
    height: 100,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30,
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
