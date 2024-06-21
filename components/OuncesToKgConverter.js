import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const OuncesToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [ounces, setOunces] = useState('');

  const handleKilogramsChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setKilograms(cleanValue);
    if (cleanValue === '') {
      setOunces('');
      return;
    }

    const kilogramsValue = parseFloat(cleanValue);
    if (isNaN(kilogramsValue)) {
      setOunces('');
      return;
    }

    const ouncesValue = kilogramsValue * 35.274;
    setOunces(ouncesValue.toFixed(2));
  };

  const handleOuncesChange = (value) => {
    const cleanValue = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');

    setOunces(cleanValue);
    if (cleanValue === '') {
      setKilograms('');
      return;
    }

    const ouncesValue = parseFloat(cleanValue);
    if (isNaN(ouncesValue)) {
      setKilograms('');
      return;
    }

    const kilogramsValue = ouncesValue / 35.274;
    setKilograms(kilogramsValue.toFixed(2));
  };

  const clearInput = () => {
    setKilograms('');
    setOunces('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Ounces (oz)"
          value={ounces}
          onChangeText={handleOuncesChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {ounces !== '' && <Text style={styles.unit}>oz</Text>}
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
    paddingRight: 35, // Space for the unit
  },
  unit: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});
export default OuncesToKgConverter;