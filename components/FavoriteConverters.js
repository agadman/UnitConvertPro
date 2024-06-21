import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import FahrenheitToCelsius from './FahrenheitToCelsius';
import CelsiusToKelvin from './CelsiusToKelvin';
import InchesToCentimeter from './InchesToCentimeter';
import PoundsToKgConverter from './PoundsToKgConverter';
import MilesToKilometers from './MilesToKilometers';
import MilesToKilometersPerHour from './MilesToKilometersPerHour';

const FavoriteConverters = () => {
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
      <Text style={[styles.text, { marginBottom: screenHeight < 700 ? 10 : 40 }]}>Your everyday friend</Text>
        <FahrenheitToCelsius />
        <CelsiusToKelvin />
        <InchesToCentimeter />
        <PoundsToKgConverter />
        <MilesToKilometers />
        <MilesToKilometersPerHour />
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear all</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default FavoriteConverters;