import React from 'react';
import {YellowBox, StatusBar, Platform} from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from './routes';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'default'}
        backgroundColor={Platform.OS === 'android' ? '#4BB0EE' : ''}
      />
    </>
  );
}
