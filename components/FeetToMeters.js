import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToMeters = () => {
  const [meters, setMeters] = useState('');
  const [feet, setFeet] = useState('');

  const handleMetersChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setMeters(value);

      if (value === '') {
        setFeet('');
        return;
      }

      const metersValue = parseFloat(value);
      if (isNaN(metersValue)) {
        setFeet('');
        return;
      }

      const feetValue = metersValue * 3.28084;
      setFeet(feetValue.toFixed(2) + ' ft');
    } catch (error) {
      console.error('Error converting meters to feet:', error);
      setMeters('');
      setFeet('');
    }
  };

  const handleFeetChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setFeet(value);

      if (value === '') {
        setMeters('');
        return;
      }

      const feetValue = parseFloat(value);
      if (isNaN(feetValue)) {
        setMeters('');
        return;
      }

      const metersValue = feetValue / 3.28084;
      setMeters(metersValue.toFixed(2) + ' m');
    } catch (error) {
      console.error('Error converting feet to meters:', error);
      setMeters('');
      setFeet('');
    }
  };

  const clearInput = () => {
    setMeters('');
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
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Meters (m)"
        value={meters}
        onChangeText={handleMetersChange}
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

export default FeetToMeters;