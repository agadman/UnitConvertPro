import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TemperatureConverter from './components/TemperatureConverter';
import LengthConverter from './components/InchesToMeterConverter';
import PoundsToKgConverter from './components/PoundsToKgConverter';
import OuncesToKgConverter from './components/OuncesToKgConverter';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground source={require("./assets/background-green.jpg")} style={styles.backgroundImage}>
          <StatusBar style="auto" />
          <View style={styles.textContainer}>
            <Text style={styles.header}>Converter</Text>
            <Text style={styles.text}>Your every day friend</Text>
          </View>
          <View style={styles.converters}>
            <TemperatureConverter />
            <LengthConverter />
            <PoundsToKgConverter />
            <OuncesToKgConverter />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  converters: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
