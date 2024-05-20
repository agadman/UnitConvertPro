import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToInches = () => {
  const [inches, setInches] = useState('');
  const [feet, setFeet] = useState('');

  const handleInchesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setInches(value);
    if (value === '') {
      setFeet('');
      return;
    }
    const inchesValue = parseFloat(value);
    const feetValue = inchesValue / 12;
    setFeet(feetValue.toFixed(2).toString() + ' ft');
  };
  
  const handleFeetChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setFeet(value);
    if (value === '') {
      setInches('');
      return;
    }
    const feetValue = parseFloat(value);
    const inchesValue = feetValue * 12;
    setInches(inchesValue.toFixed(2).toString() + ' in');
  };
  
  const clearInput = () => {
    setInches('');
    setFeet('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Feet (ft)"
        value={feet}
        onChangeText={handleFeetChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon size={20} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Inches (in)"
        value={inches}
        onChangeText={handleInchesChange}
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
export default FeetToInches;