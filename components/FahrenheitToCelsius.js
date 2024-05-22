import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FahrenheitToCelsius = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      if (isNaN(value)) {
        setCelsius('');
        setFahrenheit('');
        return;
      }

      setCelsius(value);
      if (value === '') {
        setFahrenheit('');
        return;
      }

      const celsiusValue = parseFloat(value);
      if (isNaN(celsiusValue)) {
        setFahrenheit('');
        return;
      }

      const fahrenheitValue = (celsiusValue * 9 / 5) + 32;
      setFahrenheit(fahrenheitValue.toFixed(2) + ' F');
    } catch (error) {
      console.error('Error converting Celsius to Fahrenheit:', error);
      setCelsius('');
      setFahrenheit('');
    }
  };

  const handleFahrenheitChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      if (isNaN(value)) {
        setCelsius('');
        setFahrenheit('');
        return;
      }

      setFahrenheit(value);
      if (value === '') {
        setCelsius('');
        return;
      }

      const fahrenheitValue = parseFloat(value);
      if (isNaN(fahrenheitValue)) {
        setCelsius('');
        return;
      }

      const celsiusValue = (fahrenheitValue - 32) * 5 / 9;
      setCelsius(celsiusValue.toFixed(2) + ' C');
    } catch (error) {
      console.error('Error converting Fahrenheit to Celsius:', error);
      setCelsius('');
      setFahrenheit('');
    }
  };

  const clearInput = (setInput) => {
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Fahrenheit (F)"
        value={fahrenheit}
        onChangeText={handleFahrenheitChange}
        onFocus={() => clearInput(setFahrenheit)}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Celsius (C)"
        value={celsius}
        onChangeText={handleCelsiusChange}
        onFocus={() => clearInput(setCelsius)}
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

export default FahrenheitToCelsius;