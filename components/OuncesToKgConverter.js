import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const OuncesToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [ounces, setOunces] = useState('');

  const handleKilogramsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setKilograms(value);
    if (value === '') {
      setOunces('');
      return;
    }
    const kilogramsValue = parseFloat(value);
    const ouncesValue = kilogramsValue * 35.274;
    setOunces(ouncesValue.toFixed(2).toString() + ' oz');
  };
  
  const handleOuncesChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setOunces(value);
    if (value === '') {
      setKilograms('');
      return;
    }
    const ouncesValue = parseFloat(value);
    const kilogramsValue = ouncesValue / 35.274;
    setKilograms(kilogramsValue.toFixed(2).toString() + ' kg');
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
      <CustomIcon size={20} color="white" />
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
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});
export default OuncesToKgConverter;