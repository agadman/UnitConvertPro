import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToInches = () => {
  const [inches, setInches] = useState('');
  const [feet, setFeet] = useState('');

  const handleInchesChange = (value) => {
    if (!value || /^\d*\.?\d*$/.test(value)) { // Validate input format
      setInches(value);
      if (value === '') {
        setFeet('');
        return;
      }
      const inchesValue = parseFloat(value);
      const feetValue = inchesValue / 12;
      setFeet(feetValue.toFixed(2));
    }
  };

  const handleFeetChange = (value) => {
    if (!value || /^\d*\.?\d*$/.test(value)) { // Validate input format
      setFeet(value);
      if (value === '') {
        setInches('');
        return;
      }
      const feetValue = parseFloat(value);
      const inchesValue = feetValue * 12;
      setInches(inchesValue.toFixed(2));
    }
  };

  const clearInput = () => {
    setFeet('');
    setInches('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Feet (ft)"
          value={feet}
          onChangeText={handleFeetChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {feet !== '' && <Text style={styles.unit}>ft</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Inches (in)"
          value={inches}
          onChangeText={handleInchesChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {inches !== '' && <Text style={styles.unit}>in</Text>}
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
export default FeetToInches;