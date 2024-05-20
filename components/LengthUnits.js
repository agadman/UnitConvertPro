import React from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import InchesToCentimeter from './InchesToCentimeter';
import FeetToMeters from './FeetToMeters';
import FeetToInches from './FeetToInches';
import MilesToKilometers from './MilesToKilometers';
import YardsToKilometers from './YardsToKilometers';
import SquareFeetToSquareMeters from './SquareFeetToSquareMeters';

const LengthUnits = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Text style={styles.text}>Length units</Text>
        <InchesToCentimeter />
        <FeetToMeters />
        <FeetToInches />
        <MilesToKilometers />
        <YardsToKilometers />
        <SquareFeetToSquareMeters />
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
export default LengthUnits;