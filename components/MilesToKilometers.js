import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const MilesToKilometers = () => {
  const [kilometers, setKilometers] = useState('');
  const [miles, setMiles] = useState('');

  const handleKilometersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setKilometers(value);
    if (value === '') {
      setMiles('');
      return;
    }
    const kilometersValue = parseFloat(value);
    const milesValue = kilometersValue / 1.60934;
    setMiles(milesValue.toFixed(2).toString() + ' miles');
  };
  
  const handleMilesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setMiles(value);
    if (value === '') {
      setKilometers('');
      return;
    }
    const milesValue = parseFloat(value);
    const kilometersValue = milesValue * 1.60934;
    setKilometers(kilometersValue.toFixed(2).toString() + ' km');
  };
  
  const clearInput = () => {
    setKilometers('');
    setMiles('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Miles (US miles)"
        value={miles}
        onChangeText={handleMilesChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon size={20} color="white"/>
      <TextInput
        style={styles.input}
        placeholder="Kilometers (km)"
        value={kilometers}
        onChangeText={handleKilometersChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});
export default MilesToKilometers;