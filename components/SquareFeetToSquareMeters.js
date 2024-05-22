import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const SquareFeetToSquareMeters = () => {
  const [squareMeters, setSquareMeters] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  const handleSquareMetersChange = (value) => {
    value = value.replace(/,/g, '.');

    setSquareMeters(value);
    if (value === '') {
      setSquareFeet('');
      return;
    }

    const squareMetersValue = parseFloat(value);
    if (isNaN(squareMetersValue)) {
      setSquareFeet('');
      return;
    }

    const squareFeetValue = squareMetersValue * 10.7639;
    setSquareFeet(squareFeetValue.toFixed(2) + ' sq ft');
  };
  
  const handleSquareFeetChange = (value) => {
    value = value.replace(/,/g, '.');

    setSquareFeet(value);
    if (value === '') {
      setSquareMeters('');
      return;
    }

    const squareFeetValue = parseFloat(value);
    if (isNaN(squareFeetValue)) {
      setSquareMeters('');
      return;
    }

    const squareMetersValue = squareFeetValue / 10.7639;
    setSquareMeters(squareMetersValue.toFixed(2) + ' sq m');
  };
  
  const clearInput = () => {
    setSquareMeters('');
    setSquareFeet('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Square Meters (sq m)"
        value={squareMeters}
        onChangeText={handleSquareMetersChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Square Feet (sq ft)"
        value={squareFeet}
        onChangeText={handleSquareFeetChange}
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
export default SquareFeetToSquareMeters;