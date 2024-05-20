import React from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FahrenheitToCelsius from './FahrenheitToCelsius';
import InchesToCentimeter from './InchesToCentimeter';
import PoundsToKgConverter from './PoundsToKgConverter';
import OuncesToKgConverter from './OuncesToKgConverter';
import MilesToKilometers from './MilesToKilometers';

const FavoriteConverters = () => {
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Text style={styles.text}>Your everyday friend</Text>
        <FahrenheitToCelsius />
        <InchesToCentimeter />
        <PoundsToKgConverter />
        <OuncesToKgConverter />
        <MilesToKilometers />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
});
export default FavoriteConverters;