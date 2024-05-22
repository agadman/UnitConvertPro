import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const InchesToCentimeter = () => {
  const [centimeters, setCentimeters] = useState('');
  const [inches, setInches] = useState('');

  const handleCentimetersChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setCentimeters(value);
      if (value === '') {
        setInches('');
        return;
      }

      const centimetersValue = parseFloat(value);
      if (isNaN(centimetersValue)) {
        setInches('');
        return;
      }

      const inchesValue = centimetersValue / 2.54;
      setInches(inchesValue.toFixed(2) + ' in');
    } catch (error) {
      console.error('Error converting centimeters to inches:', error);
      setCentimeters('');
      setInches('');
    }
  };

  const handleInchesChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setInches(value);
      if (value === '') {
        setCentimeters('');
        return;
      }

      const inchesValue = parseFloat(value);
      if (isNaN(inchesValue)) {
        setCentimeters('');
        return;
      }

      const centimetersValue = inchesValue * 2.54;
      setCentimeters(centimetersValue.toFixed(2) + ' cm');
    } catch (error) {
      console.error('Error converting inches to centimeters:', error);
      setInches('');
      setCentimeters('');
    }
  };

  const clearInput = () => {
    setCentimeters('');
    setInches('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Inches (in)"
        value={inches}
        onChangeText={handleInchesChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Centimeters (cm)"
        value={centimeters}
        onChangeText={handleCentimetersChange}
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

export default InchesToCentimeter;