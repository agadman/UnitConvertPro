import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const PintToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [pints, setPints] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.');

    setMilliliters(value);
    if (value === '') {
      setPints('');
      return;
    }

    const millilitersValue = parseFloat(value);
    if (isNaN(millilitersValue)) {
      setPints('');
      return;
    }

    const pintsValue = millilitersValue / 473.176;
    setPints(pintsValue.toFixed(2) + ' pt (US)');
  };

  const handlePintsChange = (value) => {
    value = value.replace(/,/g, '.');

    setPints(value);
    if (value === '') {
      setMilliliters('');
      return;
    }

    const pintsValue = parseFloat(value);
    if (isNaN(pintsValue)) {
      setMilliliters('');
      return;
    }

    const millilitersValue = pintsValue * 473.176;
    setMilliliters(millilitersValue.toFixed(2) + ' ml');
  };

  const clearInput = () => {
    setMilliliters('');
    setPints('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pints (US pt)"
        value={pints}
        onChangeText={handlePintsChange}
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

export default PintToMilliliters;