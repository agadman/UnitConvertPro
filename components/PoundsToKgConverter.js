import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const PoundsToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [pounds, setPounds] = useState('');

  const handleKilogramsChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setKilograms(cleanValue);
    if (cleanValue === '') {
      setPounds('');
      return;
    }

    const kilogramsValue = parseFloat(cleanValue);
    if (isNaN(kilogramsValue)) {
      setPounds('');
      return;
    }

    const poundsValue = kilogramsValue * 2.20462;
    setPounds(poundsValue.toFixed(2));
  };

  const handlePoundsChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setPounds(cleanValue);
    if (cleanValue === '') {
      setKilograms('');
      return;
    }

    const poundsValue = parseFloat(cleanValue);
    if (isNaN(poundsValue)) {
      setKilograms('');
      return;
    }

    const kilogramsValue = poundsValue / 2.20462;
    setKilograms(kilogramsValue.toFixed(2));
  };

  const clearInput = () => {
    setKilograms('');
    setPounds('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Pounds (lbs)"
          value={pounds}
          onChangeText={handlePoundsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {pounds !== '' && <Text style={styles.unit}>lbs</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Kilograms (kg)"
          value={kilograms}
          onChangeText={handleKilogramsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {kilograms !== '' && <Text style={styles.unit}>kg</Text>}
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
    paddingRight: 25, // Space for the unit
  },
  unit: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});
export default PoundsToKgConverter;