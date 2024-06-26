import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const InchesToCentimeter = () => {
  const [centimeters, setCentimeters] = useState('');
  const [inches, setInches] = useState('');

  const handleCentimetersChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setCentimeters(cleanValue);
    if (cleanValue === '') {
      setInches('');
      return;
    }

    const centimetersValue = parseFloat(cleanValue);
    if (isNaN(centimetersValue)) {
      setInches('');
      return;
    }

    const inchesValue = centimetersValue / 2.54;
    setInches(inchesValue.toFixed(2));
  };

  const handleInchesChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setInches(cleanValue);
    if (cleanValue === '') {
      setCentimeters('');
      return;
    }

    const inchesValue = parseFloat(cleanValue);
    if (isNaN(inchesValue)) {
      setCentimeters('');
      return;
    }

    const centimetersValue = inchesValue * 2.54;
    setCentimeters(centimetersValue.toFixed(2));
  };

  const clearInput = () => {
    setCentimeters('');
    setInches('');
  };

  return (
    <View style={styles.container}>
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
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Centimeters (cm)"
          value={centimeters}
          onChangeText={handleCentimetersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {centimeters !== '' && <Text style={styles.unit}>cm</Text>}
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
    top: '60%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});
export default InchesToCentimeter;