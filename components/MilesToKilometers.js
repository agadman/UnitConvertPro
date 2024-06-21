import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const MilesToKilometers = () => {
  const [kilometers, setKilometers] = useState('');
  const [miles, setMiles] = useState('');

  const handleKilometersChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setKilometers(cleanValue);
    if (cleanValue === '') {
      setMiles('');
      return;
    }

    const kilometersValue = parseFloat(cleanValue);
    if (isNaN(kilometersValue)) {
      setMiles('');
      return;
    }

    const milesValue = kilometersValue / 1.60934;
    setMiles(milesValue.toFixed(2));
  };

  const handleMilesChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setMiles(cleanValue);
    if (cleanValue === '') {
      setKilometers('');
      return;
    }

    const milesValue = parseFloat(cleanValue);
    if (isNaN(milesValue)) {
      setKilometers('');
      return;
    }

    const kilometersValue = milesValue * 1.60934;
    setKilometers(kilometersValue.toFixed(2));
  };

  const clearInput = () => {
    setKilometers('');
    setMiles('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Miles (US miles)"
          value={miles}
          onChangeText={handleMilesChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {miles !== '' && <Text style={styles.unit}>miles</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Kilometers (km)"
          value={kilometers}
          onChangeText={handleKilometersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {kilometers !== '' && <Text style={styles.unit}>km</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
    width: '40%',
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 50, // Space for the unit
  },
  unit: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});
export default MilesToKilometers;