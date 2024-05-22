import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToInches = () => {
  const [inches, setInches] = useState('');
  const [feet, setFeet] = useState('');

  const handleInchesChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setInches(value);

      if (value === '') {
        setFeet('');
        return;
      }

      const inchesValue = parseFloat(value);
      if (isNaN(inchesValue)) {
        setFeet('');
        return;
      }

      const feetValue = inchesValue / 12;
      setFeet(feetValue.toFixed(2) + ' ft');
    } catch (error) {
      console.error('Error converting inches to feet:', error);
      setInches('');
      setFeet('');
    }
  };

  const handleFeetChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setFeet(value);

      if (value === '') {
        setInches('');
        return;
      }

      const feetValue = parseFloat(value);
      if (isNaN(feetValue)) {
        setInches('');
        return;
      }

      const inchesValue = feetValue * 12;
      setInches(inchesValue.toFixed(2) + ' in');
    } catch (error) {
      console.error('Error converting feet to inches:', error);
      setInches('');
      setFeet('');
    }
  };

  const clearInput = (setInput) => {
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Feet (ft)"
        value={feet}
        onChangeText={handleFeetChange}
        onFocus={() => clearInput(setFeet)}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Inches (in)"
        value={inches}
        onChangeText={handleInchesChange}
        onFocus={() => clearInput(setInches)}
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

export default FeetToInches;