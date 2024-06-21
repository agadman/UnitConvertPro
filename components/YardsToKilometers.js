import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const YardsToKilometers = () => {
  const [kilometers, setKilometers] = useState('');
  const [yards, setYards] = useState('');

  const handleKilometersChange = (value) => {
    if (!value || /^\d*\.?\d*$/.test(value)) { // Validate input format
      setKilometers(value);
      if (value === '') {
        setYards('');
        return;
      }
      const kilometersValue = parseFloat(value);
      const yardsValue = kilometersValue * 1093.61;
      setYards(yardsValue.toFixed(2));
    }
  };

  const handleYardsChange = (value) => {
    if (!value || /^\d*\.?\d*$/.test(value)) { // Validate input format
      setYards(value);
      if (value === '') {
        setKilometers('');
        return;
      }
      const yardsValue = parseFloat(value);
      const kilometersValue = yardsValue / 1093.61;
      setKilometers(kilometersValue.toFixed(2));
    }
  };

  const clearInput = () => {
    setKilometers('');
    setYards('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Yards (yd)"
          value={yards}
          onChangeText={handleYardsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {yards !== '' && <Text style={styles.unit}>yd</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Kilometers (km)"
          value={kilometers}
          onChangeText={handleKilometersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {kilometers !== '' && <Text style={styles.unit}>km</Text>}
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
export default YardsToKilometers;