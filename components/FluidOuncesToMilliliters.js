import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FluidOuncesToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [fluidOunces, setFluidOunces] = useState('');

  const handleMillilitersChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setMilliliters(value);

      if (value === '') {
        setFluidOunces('');
        return;
      }

      const millilitersValue = parseFloat(value);
      if (isNaN(millilitersValue)) {
        setFluidOunces('');
        return;
      }

      const fluidOuncesValue = millilitersValue * 0.033814;
      setFluidOunces(fluidOuncesValue.toFixed(2) + ' fl oz');
    } catch (error) {
      console.error('Error converting milliliters to fluid ounces:', error);
      setMilliliters('');
      setFluidOunces('');
    }
  };

  const handleFluidOuncesChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setFluidOunces(value);

      if (value === '') {
        setMilliliters('');
        return;
      }

      const fluidOuncesValue = parseFloat(value);
      if (isNaN(fluidOuncesValue)) {
        setMilliliters('');
        return;
      }

      const millilitersValue = fluidOuncesValue / 0.033814;
      setMilliliters(millilitersValue.toFixed(2) + ' ml');
    } catch (error) {
      console.error('Error converting fluid ounces to milliliters:', error);
      setMilliliters('');
      setFluidOunces('');
    }
  };

  const clearInput = () => {
    setMilliliters('');
    setFluidOunces('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Fluid Ounces (fl oz)"
        value={fluidOunces}
        onChangeText={handleFluidOuncesChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Milliliters (ml)"
        value={milliliters}
        onChangeText={handleMillilitersChange}
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

export default FluidOuncesToMilliliters;