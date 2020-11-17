import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapScreen from './components/Screens/Map'
import EvergyMap from './components/Screens/EnergyMap';

export default function App() {
  return (
   <EvergyMap />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
