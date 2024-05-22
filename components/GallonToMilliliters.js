import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const GallonToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [gallons, setGallons] = useState('');

  const handleMillilitersChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setMilliliters(value);

      if (value === '') {
        setGallons('');
        return;
      }

      const millilitersValue = parseFloat(value);
      if (isNaN(millilitersValue)) {
        setGallons('');
        return;
      }

      const gallonsValue = millilitersValue * 0.000264172;
      setGallons(gallonsValue.toFixed(2) + ' gal');
    } catch (error) {
      console.error('Error converting milliliters to gallons:', error);
      setMilliliters('');
      setGallons('');
    }
  };

  const handleGallonsChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setGallons(value);

      if (value === '') {
        setMilliliters('');
        return;
      }

      const gallonsValue = parseFloat(value);
      if (isNaN(gallonsValue)) {
        setMilliliters('');
        return;
      }

      const millilitersValue = gallonsValue / 0.000264172;
      setMilliliters(millilitersValue.toFixed(2) + ' ml');
    } catch (error) {
      console.error('Error converting gallons to milliliters:', error);
      setMilliliters('');
      setGallons('');
    }
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});

export default GallonToMilliliters;