import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const GallonToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [gallons, setGallons] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setGallons(gallonsValue.toFixed(2));
  };

  const handleGallonsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setMilliliters(millilitersValue.toFixed(2));
  };

  const clearInput = () => {
    setMilliliters('');
    setGallons('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Gallons (gal)"
          value={gallons}
          onChangeText={handleGallonsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {gallons !== '' && <Text style={styles.unit}>gal</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Milliliters (ml)"
          value={milliliters}
          onChangeText={handleMillilitersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {milliliters !== '' && <Text style={styles.unit}>ml</Text>}
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
export default GallonToMilliliters;