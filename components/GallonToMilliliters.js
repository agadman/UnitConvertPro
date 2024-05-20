import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const GallonToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [gallons, setGallons] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setMilliliters(value);
    if (value === '') {
      setGallons('');
      return;
    }
    const millilitersValue = parseFloat(value);
    const gallonsValue = millilitersValue * 0.000264172;
    setGallons(gallonsValue.toFixed(2).toString() + ' gal');
  };
  
  const handleGallonsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setGallons(value);
    if (value === '') {
      setMilliliters('');
      return;
    }
    const gallonsValue = parseFloat(value);
    const millilitersValue = gallonsValue / 0.000264172;
    setMilliliters(millilitersValue.toFixed(2).toString() + ' ml');
  };
  
  const clearInput = () => {
    setMilliliters('');
    setGallons('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Gallons (gal)"
        value={gallons}
        onChangeText={handleGallonsChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Milliliters (ml)"
        value={milliliters}
        onChangeText={handleMillilitersChange}
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
export default GallonToMilliliters;