import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FahrenheitToCelsius = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (value) => {
    // Replace commas and dots with dots
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      return;
    }
    const celsiusValue = parseFloat(value);
    const fahrenheitValue = (celsiusValue * 9 / 5) + 32;
    setFahrenheit(fahrenheitValue.toFixed(2).toString() + ' F');
  };
  
  const handleFahrenheitChange = (value) => {
    // Replace commas and dots with dots
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      return;
    }
    const fahrenheitValue = parseFloat(value);
    const celsiusValue = (fahrenheitValue - 32) * 5 / 9;
    setCelsius(celsiusValue.toFixed(2).toString() + ' C');
  };
  

  const clearInput = () => {
    setCelsius('');
    setFahrenheit('');
  };

  return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Fahrenheit(F)"
            value={fahrenheit}
            onChangeText={handleFahrenheitChange}
            onFocus={() => clearInput(setFahrenheit)}
            keyboardType="numeric"
          />
          <CustomIcon size={20} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Celsius(C)"
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
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});

export default FahrenheitToCelsius;
