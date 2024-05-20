import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const PoundsToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [pounds, setPounds] = useState('');

  const handleKilogramsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setKilograms(value);
    if (value === '') {
      setPounds('');
      return;
    }
    const kilogramsValue = parseFloat(value);
    const poundsValue = kilogramsValue * 2.20462;
    setPounds(poundsValue.toFixed(2).toString() + ' lbs');
  };
  
  const handlePoundsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setPounds(value);
    if (value === '') {
      setKilograms('');
      return;
    }
    const poundsValue = parseFloat(value);
    const kilogramsValue = poundsValue / 2.20462;
    setKilograms(kilogramsValue.toFixed(2).toString() + ' kg');
  };
  
  const clearInput = () => {
    setKilograms('');
    setPounds('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pounds (lbs)"
        value={pounds}
        onChangeText={handlePoundsChange}
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
export default PoundsToKgConverter;