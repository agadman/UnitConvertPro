import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const YardsToKilometers = () => {
  const [kilometers, setKilometers] = useState('');
  const [yards, setYards] = useState('');

  const handleKilometersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setKilometers(value);
    if (value === '') {
      setYards('');
      return;
    }
    const kilometersValue = parseFloat(value);
    const yardsValue = kilometersValue * 1093.61;
    setYards(yardsValue.toFixed(2).toString() + ' yd');
  };
  
  const handleYardsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setYards(value);
    if (value === '') {
      setKilometers('');
      return;
    }
    const yardsValue = parseFloat(value);
    const kilometersValue = yardsValue / 1093.61;
    setKilometers(kilometersValue.toFixed(2).toString() + ' km');
  };

  const clearInput = () => {
    setKilometers('');
    setYards('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Yards (yd)"
        value={yards}
        onChangeText={handleYardsChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Kilometers (km)"
        value={kilometers}
        onChangeText={handleKilometersChange}
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
export default YardsToKilometers;