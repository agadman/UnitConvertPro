import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const MilesToKilometersPerHour = () => {
  const [kilometersPerHour, setKilometersPerHour] = useState('');
  const [milesPerHour, setMilesPerHour] = useState('');

  const handleKilometersPerHourChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setKilometersPerHour(cleanValue);
    if (cleanValue === '') {
      setMilesPerHour('');
      return;
    }

    const kilometersValue = parseFloat(cleanValue);
    if (isNaN(kilometersValue)) {
      setMilesPerHour('');
      return;
    }

    const milesValue = kilometersValue / 1.60934;
    setMilesPerHour(milesValue.toFixed(2));
  };

  const handleMilesPerHourChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setMilesPerHour(cleanValue);
    if (cleanValue === '') {
      setKilometersPerHour('');
      return;
    }

    const milesValue = parseFloat(cleanValue);
    if (isNaN(milesValue)) {
      setKilometersPerHour('');
      return;
    }

    const kilometersValue = milesValue * 1.60934;
    setKilometersPerHour(kilometersValue.toFixed(2));
  };

  const clearInput = () => {
    setKilometersPerHour('');
    setMilesPerHour('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Miles per hour (mph)"
          value={milesPerHour}
          onChangeText={handleMilesPerHourChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {milesPerHour !== '' && <Text style={styles.unit}>mph</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Kilometers per hour (km/h)"
          value={kilometersPerHour}
          onChangeText={handleKilometersPerHourChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {kilometersPerHour !== '' && <Text style={styles.unit}>km/h</Text>}
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
export default MilesToKilometersPerHour;