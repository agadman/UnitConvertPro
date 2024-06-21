import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import PoundsToKgConverter from './PoundsToKgConverter';
import OuncesToKgConverter from './OuncesToKgConverter';
import CupsToDeciliters from './CupsToDeciliters';
import FluidOuncesToMilliliters from './FluidOuncesToMilliliters';
import PintToMilliliters from './PintToMilliliters';
import QuartToMilliliters from './QuartToMilliliters';
import GallonToMilliliters from './GallonToMilliliters';

const WeightAndVolume = () => {
  const screenHeight = Dimensions.get('window').height;
  const [key, setKey] = useState(0);

  const clearAll = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView key={key}>
        <Text style={[styles.text, { marginBottom: screenHeight < 700 ? 10 : 40 }]}>
          Weight and volume
        </Text>
        <PoundsToKgConverter />
        <OuncesToKgConverter />
        <CupsToDeciliters />
        <FluidOuncesToMilliliters />
        {screenHeight > 700 && <PintToMilliliters />}
        <QuartToMilliliters />
        <GallonToMilliliters />
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear all</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default WeightAndVolume;