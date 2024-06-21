import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToMeters = () => {
  const [meters, setMeters] = useState('');
  const [feet, setFeet] = useState('');

  const handleMetersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setFeet(feetValue.toFixed(2));
  };

  const handleFeetChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setMeters(metersValue.toFixed(2));
  };

  const clearInput = () => {
    setMeters('');
    setFeet('');
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
          placeholder="Meters (m)"
          value={meters}
          onChangeText={handleMetersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {meters !== '' && <Text style={styles.unit}>m</Text>}
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
export default FeetToMeters;