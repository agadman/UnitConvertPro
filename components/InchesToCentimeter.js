import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const InchesToCentimeter = () => {
  const [centimeters, setCentimeters] = useState('');
  const [inches, setInches] = useState('');

  const handleCentimetersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setCentimeters(value);
    if (value === '') {
      setInches('');
      return;
    }
    const centimetersValue = parseFloat(value);
    const inchesValue = centimetersValue / 2.54;
    setInches(inchesValue.toFixed(2).toString() + ' in');
  };
  
  const handleInchesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setInches(value);
    if (value === '') {
      setCentimeters('');
      return;
    }
    const inchesValue = parseFloat(value);
    const centimetersValue = inchesValue * 2.54;
    setCentimeters(centimetersValue.toFixed(2).toString() + ' cm');
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
      <CustomIcon size={20} color="white" />
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
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});
export default InchesToCentimeter;