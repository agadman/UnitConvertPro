import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const PintToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [pints, setPints] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');

    setMilliliters(value);
    if (value === '') {
      setPints('');
      return;
    }
    const millilitersValue = parseFloat(value);
    const pintsValue = millilitersValue / 473.176;  // Use division to convert ml to pints
    setPints(pintsValue.toFixed(2).toString() + ' pt (US)');
  };

  const handlePintsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');

    setPints(value);
    if (value === '') {
      setMilliliters('');
      return;
    }
    const pintsValue = parseFloat(value);
    const millilitersValue = pintsValue * 473.176;  // Use multiplication to convert pints to ml
    setMilliliters(millilitersValue.toFixed(2).toString() + ' ml');
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
      <CustomIcon size={20} color="white" />
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

export default PintToMilliliters;
