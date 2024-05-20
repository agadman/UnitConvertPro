import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FluidOuncesToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [fluidOunces, setFluidOunces] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setMilliliters(value);
    if (value === '') {
      setFluidOunces('');
      return;
    }
    const millilitersValue = parseFloat(value);
    const fluidOuncesValue = millilitersValue * 0.033814;
    setFluidOunces(fluidOuncesValue.toFixed(2).toString() + ' fl oz');
  };
  
  const handleFluidOuncesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setFluidOunces(value);
    if (value === '') {
      setMilliliters('');
      return;
    }
    const fluidOuncesValue = parseFloat(value);
    const millilitersValue = fluidOuncesValue / 0.033814;
    setMilliliters(millilitersValue.toFixed(2).toString() + ' ml');
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
      <CustomIcon size={20} color="white" />
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
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});
export default FluidOuncesToMilliliters;