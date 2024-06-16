import React from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import PoundsToKgConverter from './PoundsToKgConverter';
import OuncesToKgConverter from './OuncesToKgConverter';
import CupsToDeciliters from './CupsToDeciliters';
import FluidOuncesToMilliliters from './FluidOuncesToMilliliters';
import PintToMilliliters from './PintToMilliliters';
import QuartToMilliliters from './QuartToMilliliters';
import GallonToMilliliters from './GallonToMilliliters';

const WeightAndVolume = () => {
  const screenHeight = Dimensions.get('window').height;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Text style={[styles.text, { marginBottom: screenHeight < 700 ? 10 : 60 }]}>
          Weight and volume
        </Text>
        <PoundsToKgConverter />
        <OuncesToKgConverter />
        <CupsToDeciliters />
        <FluidOuncesToMilliliters />
        <PintToMilliliters />
        <QuartToMilliliters />
        <GallonToMilliliters />
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
    marginBottom: 60,
  },
});
export default WeightAndVolume;