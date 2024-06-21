import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const FahrenheitToCelsius = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    if (isNaN(cleanValue)) {
      setCelsius('');
      setFahrenheit('');
      return;
    }

    setCelsius(cleanValue);
    if (cleanValue === '') {
      setFahrenheit('');
      return;
    }

    const celsiusValue = parseFloat(cleanValue);
    if (isNaN(celsiusValue)) {
      setFahrenheit('');
      return;
    }

    const fahrenheitValue = (celsiusValue * 9 / 5) + 32;
    setFahrenheit(fahrenheitValue.toFixed(2));
  };

  const handleFahrenheitChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    if (isNaN(cleanValue)) {
      setCelsius('');
      setFahrenheit('');
      return;
    }

    setFahrenheit(cleanValue);
    if (cleanValue === '') {
      setCelsius('');
      return;
    }

    const fahrenheitValue = parseFloat(cleanValue);
    if (isNaN(fahrenheitValue)) {
      setCelsius('');
      return;
    }

    const celsiusValue = (fahrenheitValue - 32) * 5 / 9;
    setCelsius(celsiusValue.toFixed(2));
  };

  const clearInput = () => {
    setCelsius('');
    setFahrenheit('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Fahrenheit (F)"
          value={fahrenheit}
          onChangeText={handleFahrenheitChange}
          onFocus={() => clearInput(setFahrenheit)}
          keyboardType="numeric"
        />
        {fahrenheit !== '' && <Text style={styles.unit}>F</Text>}
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
export default FahrenheitToCelsius;