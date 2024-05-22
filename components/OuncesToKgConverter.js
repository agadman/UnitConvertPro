import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const OuncesToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [ounces, setOunces] = useState('');

  const handleKilogramsChange = (value) => {
    value = value.replace(/,/g, '.');

    setKilograms(value);
    if (value === '') {
      setOunces('');
      return;
    }

    const kilogramsValue = parseFloat(value);
    if (isNaN(kilogramsValue)) {
      setOunces('');
      return;
    }

    const ouncesValue = kilogramsValue * 35.274;
    setOunces(ouncesValue.toFixed(2) + ' oz');
  };

  const handleOuncesChange = (value) => {
    value = value.replace(/,/g, '.');

    setOunces(value);
    if (value === '') {
      setKilograms('');
      return;
    }

    const ouncesValue = parseFloat(value);
    if (isNaN(ouncesValue)) {
      setKilograms('');
      return;
    }

    const kilogramsValue = ouncesValue / 35.274;
    setKilograms(kilogramsValue.toFixed(2) + ' kg');
  };

  const clearInput = () => {
    setKilograms('');
    setOunces('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ounces (oz)"
        value={ounces}
        onChangeText={handleOuncesChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Kilograms (kg)"
        value={kilograms}
        onChangeText={handleKilogramsChange}
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

export default OuncesToKgConverter;