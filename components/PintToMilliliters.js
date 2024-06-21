import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const PintToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [pints, setPints] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setPints(pintsValue.toFixed(2));
  };

  const handlePintsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setMilliliters(millilitersValue.toFixed(2));
  };

  const clearInput = () => {
    setMilliliters('');
    setPints('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Pints (pt)"
          value={pints}
          onChangeText={handlePintsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {pints !== '' && <Text style={styles.unit}>pt (US)</Text>}
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
export default PintToMilliliters;