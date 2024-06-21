import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const CelsiusToKelvin = () => {
  const [celsius, setCelsius] = useState('');
  const [kelvin, setKelvin] = useState('');

  const handleCelsiusChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    if (isNaN(cleanValue)) {
      setCelsius('');
      setKelvin('');
      return;
    }

    setCelsius(cleanValue);
    if (cleanValue === '') {
      setKelvin('');
      return;
    }

    const celsiusValue = parseFloat(cleanValue);
    if (isNaN(celsiusValue)) {
      setKelvin('');
      return;
    }

    const kelvinValue = celsiusValue + 273.15;
    setKelvin(kelvinValue.toFixed(2));
  };

  const handleKelvinChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    if (isNaN(cleanValue)) {
      setCelsius('');
      setKelvin('');
      return;
    }

    setKelvin(cleanValue);
    if (cleanValue === '') {
      setCelsius('');
      return;
    }

    const kelvinValue = parseFloat(cleanValue);
    if (isNaN(kelvinValue)) {
      setCelsius('');
      return;
    }

    const celsiusValue = kelvinValue - 273.15;
    setCelsius(celsiusValue.toFixed(2));
  };

  const clearInput = () => {
    setCelsius('');
    setKelvin('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Kelvin (K)"
          value={kelvin}
          onChangeText={handleKelvinChange}
          onFocus={() => clearInput(setKelvin)}
          keyboardType="numeric"
        />
        {kelvin !== '' && <Text style={styles.unit}>K</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Celsius (C)"
          value={celsius}
          onChangeText={handleCelsiusChange}
          onFocus={() => clearInput(setCelsius)}
          keyboardType="numeric"
        />
        {celsius !== '' && <Text style={styles.unit}>C</Text>}
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
    paddingRight: 25, // Space for the unit
  },
  unit: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});

export default CelsiusToKelvin;
