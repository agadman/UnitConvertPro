import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const FluidOuncesToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [fluidOunces, setFluidOunces] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setFluidOunces(fluidOuncesValue.toFixed(2));
  };

  const handleFluidOuncesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

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
    setMilliliters(millilitersValue.toFixed(2));
  };

  const clearInput = () => {
    setMilliliters('');
    setFluidOunces('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Fluid Ounces (fl oz)"
          value={fluidOunces}
          onChangeText={handleFluidOuncesChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {fluidOunces !== '' && <Text style={styles.unit}>fl oz</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Milliliters (ml)"
          value={milliliters}
          onChangeText={handleMillilitersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {milliliters !== '' && <Text style={styles.unit}>ml</Text>}
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
export default FluidOuncesToMilliliters;